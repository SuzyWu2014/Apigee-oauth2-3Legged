if (context.flow == "PROXY_REQ_FLOW") {
    var responseType = context.getVariable("request.queryparam.response_type");
    var clientId = context.getVariable("request.queryparam.client_id");
    var redirectUrl = context.getVariable("request.queryparam.redirect_uri");
    var scope = context.getVariable("request.queryparam.scope");
    var ticket = context.getVariable("request.queryparam.ticket")

    var callbackUrl = "https://osu-test.apigee.net/v1/oauth2/auth-code?response_type=" + responseType + "&scope=" + scope + "&client_id=" + clientId + "&redirect_uri=" + redirectUrl;
    var org_svc = encodeURIComponent(callbackUrl)
    var validateUrl = "https://login.oregonstate.edu/cas-dev/serviceValidate?ticket=" + encodeURIComponent(ticket) + "&service=" + org_svc;

    context.setVariable("info.validate_url", validateUrl);

}

if (context.flow == "TARGET_REQ_FLOW") {
    var validateUrl = context.getVariable("info.validate_url");

    context.setVariable("target.url", validateUrl);
    context.setVariable("target.copy.queryparams", true);
    context.setVariable("target.copy.pathsuffix", true);
}

if (context.flow == "PROXY_RESP_FLOW") {
    var content = context.getVariable("response.content");
    if (content.includes("authenticationSuccess")) {
        var redirectUrl = context.getVariable("oauthv2authcode.Generate-Authorization-Code.redirect_uri");
        var code = context.getVariable("oauthv2authcode.Generate-Authorization-Code.code");
        context.setVariable("response.content", null);
        context.setVariable("response.header.location", redirectUrl+ "?code=" + code);
        context.setVariable("response.status.code", 302);
    } else {
        context.setVariable("triggerError", "true");
    }
}