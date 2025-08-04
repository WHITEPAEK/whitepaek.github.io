---
title: 스프링 프로젝트에 애플 로그인 API 연동하기
created: 2020-08-31
modified: 2020-08-31
tags: []
---

[이전 글에서 "Sign in with Apple" 연동을 위한 Apple Developer 3가지 설정](/posts/2020/08/spring-apple-login-setup)을 진행하였습니다. <br />
설정을 통해서 필요한 데이터 준비가 끝났으므로 프로젝트에 설정하여 확인해보도록 하겠습니다.

먼저, 깃허브에서 [샘플 코드](https://github.com/WHITEPAEK/demo-sign-in-with-apple)를 다운로드 하도록 합니다.

macOS Catalina 버전 10.15.6 운영체제에서 IntelliJ IDEA Ultimate 환경에서 Spring Boot 프로젝트로 설명하도록 하겠습니다.

JWT 관련 라이브러리는 "nimbus-jose-jwt(v3.10)"를 이용했습니다.
해당 버전의 라이브러리를 이용한 이유는 애플 로그인 API를 적용시킬 프로젝트에서 사용하고 있기 때문에 그대로 유지하여 사용하기로 결정하였기 때문입니다.

---

프로젝트 다운로드하여 실행하였다면 application.properties 파일로 이동해주세요. <br />
[이전 글](/posts/2020/08/spring-apple-login-setup)에서 설정 후 얻은 값을 아래와 동일한 위치에 입력해주면 됩니다.

![[./images/img_01.png|그림 1: application.properties 설정]]

```properties title="application.properties"
# [그림 1.8] Team ID 값 입력
APPLE.TEAM.ID=[Team ID]

# [그림 2.5] Return URLs 값 입력
APPLE.WEBSITE.URL=[Website URLs]

# [그림 2.6] Identifier 값 입력
APPLE.AUD=[Client ID]

# [그림 3.5] Key ID 값 입력
APPLE.KEY.ID=[Key ID]

# [그림 3.5]에서 다운로드 받은 Private Key 파일을 해당 위치로 이동 후, 파일명 입력
APPLE.KEY.PATH=static/AuthKey_[KeyID].p8
```

<br />

프로젝트를 실행 후 "localhost:8080/"으로 접속하면 Sign in with Apple 로그인 화면이 정상적으로 실행됩니다.
그리고 앞서 application.properties에 설정이 정상적이라면 로그인을 진행하고 값을 반환받을 수 있습니다.

![[./images/img_02.png|그림 2: localhost:8080 접속]]

프로젝트 실행은 설정 값만 적용한다면 쉽게 진행할 수 있습니다. <br />
이어서 애플 로그인 프로세스와 코드에 대해서 설명드리도록 하겠습니다.

---

## 1. 애플 로그인 버튼 페이지

Ref. [configuring_your_webpage_for_sign_in_with_apple](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/configuring_your_webpage_for_sign_in_with_apple)

```java
// AppleController.java - 30 라인

@GetMapping(value = "/")
public String appleLoginPage(ModelMap model) {

  Map<String, String> metaInfo = appleService.getLoginMetaInfo();

  model.addAttribute("client_id", metaInfo.get("CLIENT_ID"));
  model.addAttribute("redirect_uri", metaInfo.get("REDIRECT_URI"));
  model.addAttribute("nonce", metaInfo.get("NONCE"));

  return "index";
}
```

위 코드는 "localhost:8080/"으로 접속하면 Sign in with Apple 애플 로그인 버튼이 보이는 화면입니다. <br />
유저가 버튼을 클릭하면 로그인이 진행되는데 이때 메타정보와 유저 아이디, 비밀번호가 애플에게 요청됩니다.

| **필드** | **설명** |
| --- | --- |
| ID | 유저 아이디 |
| Password | 유저 비밀번호 |
| appleid-signin-client-id | Services ID - Identifier 값 |
| appleid-signin-scope | 애플에게 전달받을 유저 정보 - name email |
| appleid-signin-redirect-uri | Services ID - Return URLs 값 |
| appleid-signin-state | 상태 값 |
| appleid-signin-nonce | 임시 값 |

## 2. 유저 로그인 후 정보 받기

Ref. [sign_in_with_apple_rest_api/authenticating_users_with_sign_in_with_apple](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/authenticating_users_with_sign_in_with_apple)

```java
// AppleController.java - 69 라인

@PostMapping(value = "/redirect")
@ResponseBody
public TokenResponse servicesRedirect(ServicesResponse serviceResponse) {

  if (serviceResponse == null) {
  	return null;
  }

  String code = serviceResponse.getCode();
  String client_secret = appleService.getAppleClientSecret(serviceResponse.getId_token());

  logger.debug("================================");
  logger.debug("id_token ‣ " + serviceResponse.getId_token());
  logger.debug("payload ‣ " + appleService.getPayload(serviceResponse.getId_token()));
  logger.debug("client_secret ‣ " + client_secret);
  logger.debug("================================");

  return appleService.requestCodeValidations(client_secret, code, null);
}
```

정의된 7개의 데이터와 함께 "https://appleid.apple.com/auth/authorize" 호출되고, 애플은 Services ID에 정의된 Return URLs로 JSON 데이터를 반환합니다.

```json
{
  "state":"test",
  "code":"c50d317be38c742c0beb19d8743de014c.0.nruy.1NtQvAmp9uhyrsMj1mp7kg",
  "id_token":"eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLndoaXRlcGFlay5zZXJ2aWNlcyIsImV4cCI6MTU5ODgwMDEyOCwiaWF0IjoxNTk4Nzk5NTI4LCJzdWIiOiIwMDAxNDguZjA2ZDgyMmNlMGIyNDgzYWFhOTdkMjczYjA5NzgzMjUuMTcxNyIsIm5vbmNlIjoiMjBCMjBELTBTOC0xSzgiLCJjX2hhc2giOiJ1aFFiV0gzQUFWdEc1OUw4eEpTMldRIiwiZW1haWwiOiJpNzlmaWl0OWIzQHByaXZhdGVyZWxheS5hcHBsZWlkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImlzX3ByaXZhdGVfZW1haWwiOiJ0cnVlIiwiYXV0aF90aW1lIjoxNTk4Nzk5NTI4LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.GQBCUHza0yttOfpQ-J5OvyZoGe5Zny8pI06sKVDIJaQY3bdiphllg1_pHMtPUp7FLv3ccthcmqmZn7NWVoIPkc9-_8squ_fp9F68XM-UsERKVzBvVR92TwQuKOPFr4lRn-2FlBzN4NegicMS-IV8Ad3AKTIRMIhvAXG4UgNxgPAuCpHwCwEAJijljfUfnRYO-_ywgTcF26szluBz9w0Y1nn_IIVCUzAwYiEMdLo53NoyJmWYFWu8pxmXRpunbMHl5nvFpf9nK-OGtMJrmZ4DlpTc2Gv64Zs2bwHDEvOyQ1WiRUB6_FWRH5FV10JSsccMlm6iOByOLYd03RRH2uYtFw",
  "user":"{
    \"email\":\"i79fiit9b3@privaterelay.appleid.com\",
    \"name\":{
      \"firstName\":\"SEUNGJOO\",
      \"lastName\":\"PAEK\"
    }
  }"
}
```

반환받은 JSON 데이터는 "state, code, id_token, user" 4개의 키로 이루어져 있습니다.
여기서 알고 있어야 할 부분은 user 키는 유저가 서비스 최초 가입할 때만 받을 수 있습니다.
또한, 유저는 자신의 email을 공유할 수도 있고, 하지 않을 수도 있습니다.
(JSON 데이터는 유저가 email을 공유하지 않은 데이터이며, "code" 키의 값은 5분 동안 유효합니다.)

## 3. id_token 5가지 유효성 검증

Ref. [sign_in_with_apple_rest_api/verifying_a_user](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/verifying_a_user) <br />
Ref. [sign_in_with_apple/fetch_apple_s_public_key_for_verifying_token_signature](https://developer.apple.com/documentation/sign_in_with_apple/fetch_apple_s_public_key_for_verifying_token_signature)

애플에게 로그인 유저에 대한 정보를 JSON 데이터로 받은 후 "id_token" 값을 decode 하여 "RSA, exp, nonce, iss, aud" 5가지의 검증 절차를 진행합니다.

```java
// AppleUtils.java - 69 라인

public boolean verifyIdentityToken(String id_token) {

  try {
    SignedJWT signedJWT = SignedJWT.parse(id_token);
    ReadOnlyJWTClaimsSet payload = signedJWT.getJWTClaimsSet();

  // EXP
    Date currentTime = new Date(System.currentTimeMillis());
    if (!currentTime.before(payload.getExpirationTime())) {
    	return false;
    }

    // NONCE(Test value), ISS, AUD
    if (!"20B20D-0S8-1K8".equals(payload.getClaim("nonce")) || !ISS.equals(payload.getIssuer()) || !AUD.equals(payload.getAudience().get(0))) {
    	return false;
    }

    // RSA
    if (verifyPublicKey(signedJWT)) {
    	return true;
    }
  } catch (ParseException e) {
  	e.printStackTrace();
  }

  return false;
}
```
<br />

"exp, nonce, iss, aud"의 값은 "id_token" 값을 decode 하면 PAYLOAD 영역에 존재합니다. <br />
[jwt.io](https://jwt.io/)에서 전달받은 JSON을 decode 할 수 있습니다.

![[./images/img_03.png|그림 3: id_token을 Decoded]]

RSA 검증은 "GET https://appleid.apple.com/auth/keys" 를 호출하여 공개키 리스트를 받은 후
"id_token" 값의 HEADER 영역의 kid와 동일한 공개키 데이터로 서명 확인을 진행합니다.

![[./images/img_04.png|그림 4: id_token을 공개키 서명 확인]]

| **키** | **값** |
| --- | --- |
| exp | id\_token 만료 시간 (10분) |
| iss | https://appleid.apple.com |
| aud | Services ID - Identifier 값 |
| nonce | 생성된 임의 값 |
| RSA | Apple에서 제공받은 Public Key |

## 4. client_secret 생성

Ref. [sign_in_with_apple/generate_and_validate_tokens](https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens)

[3]에서 5가지의 검증 절차가 정상적으로 완료되었다면 client_secret을 생성해주도록 합니다.

```java
// AppleUtils.java - 131 라인

public String createClientSecret() {

        JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.ES256).keyID(KEY_ID).build();
        JWTClaimsSet claimsSet = new JWTClaimsSet();
        Date now = new Date();

        claimsSet.setIssuer(TEAM_ID);
        claimsSet.setIssueTime(now);
        claimsSet.setExpirationTime(new Date(now.getTime() + 3600000));
        claimsSet.setAudience(ISS);
        claimsSet.setSubject(AUD);

        SignedJWT jwt = new SignedJWT(header, claimsSet);

        try {
            ECPrivateKey ecPrivateKey = new ECPrivateKeyImpl(readPrivateKey());
            JWSSigner jwsSigner = new ECDSASigner(ecPrivateKey.getS());

            jwt.sign(jwsSigner);

        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (JOSEException e) {
            e.printStackTrace();
        }

        return jwt.serialize();
}
```

client_secret은 JWT로 생성되며 필요한 값은 아래와 같습니다.

| **키** | **값** |
| --- | --- |
| kid | 애플에서 생성한 Private Key에 대한 Key ID |
| alg | ES256 |
| iss | App ID 생성에 사용된 Team ID |
| iat | 생성 시간 |
| exp | 만료 시간 |
| aud | https://appleid.apple.com |
| sub | Services ID - Identifier 값 |

위의 데이터로 client_secret의 JWT가 생성되었다면,
마지막으로 애플에서 다운로드한 Key 파일 안에 들어있는 Private Key로 서명을 해주면 client_secret이 정상적으로 생성 완료됩니다.

## 5. 토큰 검증 및 발급

Ref. [sign_in_with_apple/generate_and_validate_tokens](https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens) <br />
Ref. [sign_in_with_apple/tokenresponse](https://developer.apple.com/documentation/sign_in_with_apple/tokenresponse)

[2]에서 전달받은 code와 [4]에서 생성한 client_secret의 값 그리고  "client_id, grant_type, redirect_uri" 값으로
"POST https://appleid.apple.com/auth/token" 을 호출하여 권한 부여를 위한 토큰 검증을 진행하도록 합니다.
("code"는 5분간 유효한 값이므로 주의하도록 한다.)

```java
// AppleUtils.java - 189 라인

public TokenResponse validateAuthorizationGrantCode(String client_secret, String code) {

        Map<String, String> tokenRequest = new HashMap<>();

        tokenRequest.put("client_id", AUD);
        tokenRequest.put("client_secret", client_secret);
        tokenRequest.put("code", code);
        tokenRequest.put("grant_type", "authorization_code");
        tokenRequest.put("redirect_uri", APPLE_WEBSITE_URL);

        return getTokenResponse(tokenRequest);
}
```

| **키** | **값** |
| --- | --- |
| client\_id | Services ID - Identifier 값 |
| client\_secret | eyJraWQiOiJWTTJOOFMzN1RSIiwiYWxnIjoiRVMyNT ... 생략 |
| code | c3944a20072b7446b97633646556204f8.0.rruy.Gjgud84EqqpCvP31MrudDw |
| grant\_type | authorization\_code |
| redirect\_uri | Services ID - Return URLs 값 |

"POST https://appleid.apple.com/auth/token" 호출이 정상적으로 완료되면 JSON 데이터를 반환받습니다.
반환받은 JSON 데이터에서 "id_token"을 decode 하여 필요한 유저 정보를 얻을 수 있습니다.

```json
{
  "access_token":"a08c1600e80f84d44842ce3342abac413.0.mruy.IyMPSXmTYtMyUCDWDKKN3g",
  "expires_in":3600,
  "id_token":"eyJraWQiOiJlWGF1bm1MIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLndoaXRlcGFlay5zZXJ2aWNlcyIsImV4cCI6MTU5ODgwMjU2NiwiaWF0IjoxNTk4ODAxOTY2LCJzdWIiOiIwMDAxNDguZjA2ZDgyMmNlMGIyNDgzYWFhOTdkMjczYjA5NzgzMjUuMTcxNyIsIm5vbmNlIjoiMjBCMjBELTBTOC0xSzgiLCJhdF9oYXNoIjoiaFNMOFBrZWxoNWdFblNGeURISGNIQSIsImVtYWlsIjoiaTc5ZmlpdDliM0Bwcml2YXRlcmVsYXkuYXBwbGVpZC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJpc19wcml2YXRlX2VtYWlsIjoidHJ1ZSIsImF1dGhfdGltZSI6MTU5ODgwMTk2Miwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlfQ.WqYWPuTi8apdqQnP9V6-yvVLBt84P48mYVbGa0e3io4sNKL919iIVZfNoE1GZ8F6WNOrXtcOQU_n3hclrfmNyYsidj-IH6R-0JwxwLobKJoFNH7lfKd067OyiYGxHJMFcleRaDoRWsBF4Wh_FUT3Nft_qy2CVd9pNEg-mFOruI6-5oUDdnPQwelywNCsqlkmECcKna4Psvs9eRn58ALfpke5SL-A762--peGzgp00RvrGMK4t26UWG9UN13LIXDvX3ydMCdg8gvmO7BizSoi4zJHgvKuYxLLT_heOkvNWxcT81h7dEdwqAczLTE3FBarTkAekxvtykVwlEBlfyoXcg",
  "refresh_token":"r8e88bc9f62bc496398b71117610c5aeb.0.mruy.UuuL5tpwnWaof86XPErqJg",
  "token_type":"Bearer"
}
```

## 6. refresh_token 검증 및 토근 재발급

Ref. [sign_in_with_apple/generate_and_validate_tokens](https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens) <br />
Ref. [sign_in_with_apple/tokenresponse](https://developer.apple.com/documentation/sign_in_with_apple/tokenresponse)

[5]에서 전달받은 "refresh_token"에 대한 유효성 검증을 하고 싶다면 "client_id, client_secret, grant_type, refresh_token"의 값으로
"POST https://appleid.apple.com/auth/token" 호출하여 검증을 진행합니다.

```java
// AppleUtils.java - 210 라인

public TokenResponse validateAnExistingRefreshToken(String client_secret, String refresh_token) {

        Map<String, String> tokenRequest = new HashMap<>();

        tokenRequest.put("client_id", AUD);
        tokenRequest.put("client_secret", client_secret);
        tokenRequest.put("grant_type", "refresh_token");
        tokenRequest.put("refresh_token", refresh_token);

        return getTokenResponse(tokenRequest);
}
```

| **키** | **값** |
| --- | --- |
| client\_id | Services ID - Identifier 값 |
| client\_secret | eyJraWQiOiJWTTJOOFMzN1RSIiwiYWxnIjoiRVMyNTYifQ ... 생략 |
| grant\_type | refresh\_token |
| refresh\_token | r8e88bc9f62bc496398b71117610c5aeb.0.mruy.UuuL5tpwnWaof86XPErqJg |

"refresh_token"에 대한 "POST https://appleid.apple.com/auth/token" 호출이 정상적으로 완료되면 JSON 데이터를 반환받습니다.
반환받은 JSON 데이터에서 "id_token"을 decode 하여 필요한 유저 정보를 얻을 수 있습니다.

```json
{
  "access_token":"aebbe3a8249d745d486af1573ac74b821.0.mruy.lamBfraOUXnmnhxb4NxjAA",
  "expires_in":3600,
  "id_token":"eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLndoaXRlcGFlay5zZXJ2aWNlcyIsImV4cCI6MTU5ODgwMzYxOSwiaWF0IjoxNTk4ODAzMDE5LCJzdWIiOiIwMDAxNDguZjA2ZDgyMmNlMGIyNDgzYWFhOTdkMjczYjA5NzgzMjUuMTcxNyIsImF0X2hhc2giOiJnN0N3WnhXSTBvOW5wdUhvSjE3azRBIiwiZW1haWwiOiJpNzlmaWl0OWIzQHByaXZhdGVyZWxheS5hcHBsZWlkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImlzX3ByaXZhdGVfZW1haWwiOiJ0cnVlIn0.R77ost9PyivMguFyXYLyng-RZbH9lPq_GAA-35cr6DtanfInCg4UtlxFmoaGV6_euxK7vCVu_32vEiEkrktJwJF7H1RSOdQ8JBgBZt6Qdnr4hR_vfQTpb6D1JMoiLD_GCmjz_rfwvI0ityON1yjBCuYsJbV6RMasrNw6LvWueqAQ0v_nls68gxAqwGR0XOtl9SwK7CJK7Nj-BqJMcQT_H3sw8QM6zw1XopuEqSk7Ci8Qirh8Z36a9oSfilgXs7vT-H99CGk50HkYkLU9-DawoyaWc_iAMC3ROAo_WvxI_tlPs9CjtwZNXlBvz4ExLl9zVgAM9Rh8oE5R2evXeag3SQ",
  "token_type":"Bearer"
}
```

<br />

대략적인 애플 로그인(Sign in with Apple) 연동에 대해서 설명했습니다.
코드와 같이 풀어서 쉽게 설명하려고 했으나 생각보다 더 복잡하고 헷갈릴 수 있을 거 같습니다.
Apple Developer Documentation을 참고하며 코드를 보면서 이해하신다면 포스트보다 이해하기가 좀 더 수월하실 거라 생각합니다.

Sign in with Apple 흐름은 아래와 같습니다.
1. "Sign in with Apple" 버튼이 있는 애플 로그인 페이지
2. "https://appleid.apple.com/auth/authorize" 호출 - (유저 로그인)
3. "https://appleid.apple.com/auth/keys" 공개 키 호출 및 검증 - (rsa, exp, nonce, iss, aud)
4. "client_secret" 생성 - (jwt + private key)
5. "https://appleid.apple.com/auth/token" 호출 - (authorization_code)
6. "https://appleid.apple.com/auth/token" 호출 - (refresh_token)

---

## 내용 추가 1 - 애플 로그인 페이지

추가적으로 앱(App)에 Sign in with Apple 버튼이 존재하는 페이지가 아닌 애플 로그인 페이지 화면을 제공해야 하는 경우에는
"https://appleid.apple.com/auth/authorize"를 redirect 해주면 ID와 Password를 입력하는 화면으로 바로 이동됩니다.

```java
// AppleController.java - 48 라인

@GetMapping(value = "/apple/login")
    public String appleLogin(ModelMap model) {

        Map<String, String> metaInfo = appleService.getLoginMetaInfo();

        model.addAttribute("client_id", metaInfo.get("CLIENT_ID"));
        model.addAttribute("redirect_uri", metaInfo.get("REDIRECT_URI"));
        model.addAttribute("nonce", metaInfo.get("NONCE"));
        model.addAttribute("response_type", "code id_token");
        model.addAttribute("scope", "name email");
        model.addAttribute("response_mode", "form_post");

        return "redirect:https://appleid.apple.com/auth/authorize";
}
```

![[./images/img_05.png|그림 5: Apple ID 로그인 화면으로 이동]]

## 내용 추가 2 - 이메일 변경, 서비스 해지, 애플 계정 탈퇴 이벤트가 발생한 경우

유저의 애플 계정에 대한 이벤트가 발생하면 body 안에 payload 키로 jwt 형태의 데이터가 담겨서 "App ID에 등록된 Endpoint URL"로 전송됩니다.

```java
// AppleController.java - 108 라인

@PostMapping(value = "/apps/to/endpoint")
    @ResponseBody
    public void appsToEndpoint(@RequestBody AppsResponse appsResponse) {
        logger.debug("[/path/to/endpoint] RequestBody ‣ " + appsResponse.getPayload());
}
```

payload의 값은 jwt이므로 decode 하면 HEADER와 PAYLOAD 데이터 영역으로 나뉩니다.

```json
{
  "payload" : "eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLnNrdC5tYXNzaXZlYXJzaWduaW4iLCJleHAiOjE1OTg0MzU0MTIsImlhdCI6MTU5ODM0OTAxMiwianRpIjoiZDNvTUVfWE1tcjVqcC1KWlRMUHVIUSIsImV2ZW50cyI6IntcInR5cGVcIjpcImNvbnNlbnQtcmV2b2tlZFwiLFwic3ViXCI6XCIwMDAxNDguYzEyZjdlNmI4Yjk2NDExNGEzYzRiZTdmYzY5M2I0MzYuMDgxNlwiLFwiZXZlbnRfdGltZVwiOjE1OTgzNDg5ODQyMTJ9In0.EDWOfSnbdBDdNVGeSL7KBymsYV8NkcRz9XY1mCPIcWrOABK1tVLyLqdlclRwqD4lBKeJgGS74tE_YMAx1Z9iJcZVjL_56OuCbvKRge_-RXn8PLXbTJWONh8PBrsNSrbwZvykwLbKEcKfhNWcJWzoPNsuKLxVS5aPSQ59OjaegP8WNzYpRfDwO-f7prWSHPnkEO4vv6WQvYmKD3zQMl4DqkZwAIbWCv4TzAKP3h-vzy4RVNghF1WBrAG4MANdVY_Y6gJdvDnAy1tcghqpD5k13r04PaWpT3GU1QI--ps0EaNLekSJxrNUDZrD9bUxb1fLEthoQv4v4lcR_Y2xlp_Pbg"
}
```

유저가 서비스 해지를 한 경우, 전달된 payload의 값을 decode 한 결과입니다.

```text
--HEADER--
{
  "kid": "86D88Kf",
  "alg": "RS256"
}

--PAYLOAD--
{
  "iss":"https:\/\/appleid.apple.com",
  "aud":"com.whitepaek.services",
  "exp":1598929977,
  "iat":1598843577,
  "events":"{
    \"type\":\"consent-revoked\",
    \"sub\":\"000148.f06d822ce0b2483aaa97d273b0978325.1717\",
    \"event_time\":1598843567475
  }",
  "jti":"uZmGepCUZyA_0by3Jh7JCQ"
}
```