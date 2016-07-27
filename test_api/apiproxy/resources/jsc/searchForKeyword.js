function isLookupEntryMatch(entry){
    //this is the filter thisArg
    var matchCase = this.toLowerCase();
    if(entry.title.toLowerCase().indexOf(matchCase) != -1){
        //Check title property if it contains the matchstring
        print("TITLE " + entry.title + " " + this);
        return true;
    }else if(entry.url.toLowerCase().indexOf(matchCase) != -1 ){
        print("URL " + entry.url + " " + this);
        return true;
    }else{
        for(var i = 0; i < entry.synonyms.length; i++){
            if(entry.synonyms[i] == this){
                print("SYNONYMS " + entry.synonyms[i] + " " + this);
                return true;
            }
        }
         //Check tags array for matches
        for(i = 0; i < entry.tags.length; i++){
            if(entry.tags[i] == this){
                print("TAGS " + entry.tags[i] + " " + this);
                return true;
            }
        }
        return false;
    }
}

if (context.flow == "TARGET_RESP_FLOW"){
    var theLookupFile = JSON.parse(context.getVariable("response.content"));
    //print(theXml);
    var theSearchQueryString = context.getVariable("request.queryparam.q");
    print(theSearchQueryString);

    var matches = [];
    if(theSearchQueryString !== null){
         var matches = theLookupFile.filter(isLookupEntryMatch,theSearchQueryString);
    }

    var theMatchJSON = JSON.stringify(matches);
    print(theMatchJSON);
    context.setVariable("response.content", theMatchJSON);

}