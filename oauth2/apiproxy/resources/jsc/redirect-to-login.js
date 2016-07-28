if (context.flow == "PROXY_REQ_FLOW") {
    var responseType = context.getVariable("request.queryparam.response_type");
    var clientId = context.getVariable("request.queryparam.client_id");
    var redirectUrl = context.getVariable("request.queryparam.redirect_uri");
    var scope = context.getVariable("request.queryparam.scope");

    var callbackUrl = "https://osu-test.apigee.net/v1/oauth2/auth-code?response_type=" + responseType + "&scope=" + scope + "&client_id=" + clientId + "&redirect_uri=" + redirectUrl;
    var service = encodeURIComponent(callbackUrl)
    var loginUrl = "https://login.oregonstate.edu/cas-dev/login?service=" + service;

    context.setVariable("info.login_url", loginUrl);
}

if (context.flow == "TARGET_REQ_FLOW") {
    var loginUrl = context.getVariable("info.login_url");

    context.setVariable("target.url", loginUrl);
    context.setVariable("target.copy.queryparams", true);
}
