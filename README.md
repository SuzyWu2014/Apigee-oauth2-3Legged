# Apigee-oauth2-3Legged

# Steps to follow:
## Authorize with CAS and get auth code:

Example request:
```
> GET
https://{organization_name}.apigee.net/v1/oauth2/authorize?response_type=code&client_id=[client_id]&redirect_uri=[redirect_uri]
```

* client_id: api_key for your product
* redirect_uri: need to match with the callback url associated with the client_id including the protocol

+ expected result after login: `redirect_uri?code=xxxx`

## Get token

```bash
 curl "https://{organization_name}.apigee.net/v1/oauth2/token?grant_type=authorization_code&code=[code]&redirect_uri=[redirect_uri]" -X POST -d 'client_id=[client_id]&client_secret=[client_secret]'
```

expected result:
```json
{
  "issued_at" : "1469658588385",
  "scope" : "",
  "application_name" : "XXXX",
  "refresh_token_issued_at" : "1469658588385",
  "status" : "approved",
  "refresh_token_status" : "approved",
  "api_product_list" : "[api-name]",
  "expires_in" : "359999",
  "developer.email" : "shujinwu@onid.oregonstate.edu",
  "token_type" : "BearerToken",
  "refresh_token" : "*******************",
  "client_id" : "**************",
  "access_token" : "***************",
  "organization_name" : "***",
  "refresh_token_expires_in" : "0",
  "refresh_count" : "0"
}
```

## Access api
```bash
curl "redirect_uri?querypara=***" -H "Authorization: Bearer [access_token]"
```

expected result: Results from your api server.
