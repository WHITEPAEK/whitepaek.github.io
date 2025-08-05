---
headline: 스프링 프로젝트에 애플 인 앱 결제(IAP, In-App Purchase) 서버 개발
datePublished: 2020-12-01
dateModified: 2020-12-01
keywords: []
---

애플(Apple)의 [인 앱 결제(In-App Purchase)](https://developer.apple.com/documentation/storekit/in-app_purchase)를 통해 구입한 상품 데이터를
스프링(Spring) 프로젝트로 구현한 서버(Server)에서 검증을 하고 데이터베이스에 저장하여 구입이 완료된 상품을 관리할 수 있도록 프로세스를 확인해보도록 하겠습니다.

상품 구매에 대한 인 앱 결제 프로세스를 확인해보도록 하겠습니다.

![[./images/img_01.png|그림 1: 인 앱 결제 프로세스(In-App Purchase Process)]]

1. App은 Server에서 상품 목록 API를 호출합니다. <br />
Server는 관리자가 실제로 App Store Connect에서 등록한 상품을 DB에서 관리하며, 목록을 App에게 제공합니다.

2. App은 선택한 상품의 구매 가능 여부를 Server에 요청합니다. <br />
Server는 유저가 선택한 상품이 구매한 적이 있는 상품인지 확인하여 App에게 제공합니다. <br />
(상품 구매가 가능한 경우, Server에서 고유한 ID를 생성해서 [3 ~ 5-2] 과정을 Server 입장에서 하나의 트랜잭션으로 관리하여 데이터 안정성을 관리할 수 있지 않을까..? 고유한 ID가 생성되면 DB에 저장 - 서버 입장에서의 구매 트랜잭션 시작)

3. App은 구매 가능한 상품인 경우에 App Store에 결제를 진행합니다. <br />
결제가 완료되면 App은 receipt-data를 생성합니다. (트랜잭션 시작)

4. App은 생성한 receipt-data로 Server에 상품 결제 검증 요청 API를 호출합니다. <br />
4-1. Server는 App에서 전달받은 receipt-data로 App Store에게 영수증 검증(/verifyReceipt) API를 호출합니다. <br />
4-2. Server는 App Store에게 JSON 형태의 영수증 데이터를 응답받습니다. <br />
4-3. Server는 응답받은 영수증 데이터에서 필요한 값을 파싱 하여 DB에 저장하도록 합니다. (유저가 구입한 상품을 DB에 저장) <br />
4-4. 유저가 구입한 상품을 DB에 저장 완료했다면 Server는 성공 응답 값을 App에게 전달합니다.

5. App은 Server에게 성공 응답 값을 받으면 트랜잭션을 종료시키고 Server에게 구매 완료 API를 호출합니다. <br />
5-1. Server는 App에게 구매 완료 요청을 받으면 [4-3]과정에서 DB에 저장한 영수증 데이터에 완료에 대한 업데이트를 합니다.
([2-2] 과정에서 Server가 생성한 고유한 ID로 구매 완료된 상품에 대한 데이터를 찾아서 업데이트 - 서버 입장에서의 구매 트랜잭션 종료) <br />
5-2. App은 인 앱 결제에 대한 프로세스가 최종적으로 종료됩니다.

서버(Server)는 인 앱 결제 프로세스에서 "상품 목록, 상품 구매 가능 여부, 상품 결제 검증, 상품 구매 완료" 4개의 API를 App에게 제공해주면 됩니다. "상품 목록, 상품 구매 가능 여부, 상품 구매 완료" API는 해당 서비스 정책에 따라서 다르기 때문에 플로우(Flow)에서만 설명하도록 하고, 해당 글에서는 [Step 03 ~ Step 04] 과정에 대한 코드를 확인하고 발생할 수 있는 이슈 사항에 대해 체크해보도록 하겠습니다.

---

인 앱 결제에 대한 서버 코드에 대해 확인하기 전, 애플에서 제공하는 상품 종류에 따른 몇 가지 특징에 대해서는 확인해보도록 하겠습니다.

애플에서 제공하는 인 앱 결제에 대한 상품 종류는 총 4가지입니다. <br />
Ref. [In-app purchase types](https://help.apple.com/app-store-connect/#/dev3cd978dbd)

| **상품명** | **설명** | **특징** |
| --- | --- | --- |
| **소모품(Consumable)** | 앱 내에서 사용하면 소모되는 일회성 상품입니다. | 정상적으로 구매가 완료(App에서 트랜잭션을 종료) 되었다면 "/verifyReceipt"를 호출하였을 때 소모품에 대한 응답 값은 확인할 수 없습니다. |
| **비소모품(Non-Consumable)** | 한 번 구매하면 기간 제한없이 계속 사용할 수 있는 상품입니다. | \- "/verifyReceipt"를 호출하면 비소모품에 대한 데이터를 포함한 응답 값을 반환합니다.<br />  \- 복원(Restore)되면 transaction\_id는 변경됩니다. |
| **자동 갱신 구독(Auto-Renewable Subscription)** | 구매 후 고객이 취소하기 전까지 자동으로 결제가 이루어지는 상품입니다. | \- "/verifyReceipt"를 호출할 때 "receipt-data, password" 2개의 값이 필요합니다.<br />   \- "/verifyReceipt"를 호출하면 자동 갱신 구독에 대한 데이터를 포함한 응답 값을 반환합니다.<br />   \- 갱신되면 transaction\_id는 변경되며 상품에 대한 receipt 데이터는 응답 값에 추가됩니다. |
| **비자동 갱신 구독(Non-Renewable Subscription)** | 구매 후 특정 기간동안 사용할 수 있으며, 자동으로 결제가 이루어지지 않습니다. 고객이 재구매를 통해 기간을 연장할 수 있는 상품입니다. | \- "/verifyReceipt"를 호출하면 비자동 갱신 구독에 대한 데이터를 포함한 응답 값을 반환합니다.<br />   \- 갱신되면 transaction\_id는 변경되며 상품에 대한 receipt 데이터는 응답 값에 추가됩니다. |

각 상품 특징에 대해 확인했습니다. 그렇다면 상품에 대한 receipt-data는 어떻게 얻을까요?
App 개발자와 협업을 통해 테스트 앱 혹은 데이터를 얻을 수 있다면 큰 문제는 되지 않습니다.

하지만 상황이 여의치 않다면 직접 테스트 앱을 만들어서 필요한 데이터를 얻는 수밖에..
저는 여의치 않은 상황이었고, 앱 쪽에서 상품 구매와 완료 처리되는 게 궁금했기 때문에 테스트 앱을 실행 후 데이터를 얻었습니다.

[Developer](https://developer.apple.com/)와 [App Store Connect](https://appstoreconnect.apple.com/) 설정과 테스트 앱 실행까지 설명하면 좋겠지만, 인 앱 결제 처리에 대한 서버 프로세스에 집중하도록 하겠습니다.


테스트 앱에서 제가 얻은 각 상품에 대한 receipt-data는 아래와 같습니다.

```text title="소모품(Consumable)의 receipt-data"
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
```

<br />

```text title="비소모품(Non-Consumable)의 receipt-data"
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
```
<br />

```text title="자동 갱신 구독(Auto-Renewable Subscription)의 receipt-data"
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
```

<br />

```text title="비자동 갱신 구독(Non-Renewable Subscription)의 receipt-data"
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
```

서버 프로세스를 간략하게 이해하고, 애플에서 제공하는 상품 4가지에 대해서 알아봤습니다.

receipt-data까지 준비가 완료되었다면 스프링 프로젝트의 로직을 확인하도록 하겠습니다.
(receipt-data 준비가 어렵다면 위에 제가 제공해드린 receipt-data를 사용해도 상관없습니다.)

글에서 설명드리는 코드가 필요하신 분은 [GitHub을 통해서 다운로드](https://github.com/WHITEPAEK/demo-in-app-purchase)하시면 됩니다.

---

![[./images/img_02.png|그림 2: application.properties 설정]]

application.properties는 따로 설정할 필요가 없을 거 같습니다.
"APPLE.PASSWORD"는 자동 갱신 구독 상품에 대한 서비스를 제공하고 있다면
App Store Connect에서 생성한 공유 암호를 넣어주시면 됩니다.

하지만 이 글에서는 소모품 상품에 대해서만 테스트해 보도록 하겠습니다.
(소모품 상품에 대해서만 테스트를 진행한 이유는 아래에서 설명드리도록 하겠습니다.)

소모품 외에도 "비소모품, 비자동 갱신 구독" 상품은 따로 password가 필요하지 않기 때문에 문제없이 진행할 수 있습니다.
(자동 갱신 구독 상품에 대한 구매 이력이 포함되어 있는 receipt-data는 password가 필요합니다.)

## 1. App에서 "receipt-data" 요청받기
[그림 1]에서 "4. 상품 결제 검증 요청" 프로세스 부분입니다.

```java
@RestController
public class AppleController {

    private final AppleService appleService;

    public AppleController(AppleService appleService) {
        this.appleService = appleService;
    }

    @PostMapping("/purchase")
    public ResponseEntity purchase(@RequestBody UserReceipt userReceipt) {

        String code = appleService.updatePurchaseHistory(userReceipt);

        return ResponseEntity.ok(code);
    }

}
```

유저가 구매한 상품을 서버에서 관리하기 위해서는 App에게 receipt-data 외에도 유저(구매자)에 대한 데이터도 받아야 합니다.
실제 서비스를 구현할 때는 UserReceipt.java 파일에서 유저 관리에 필요한 Fields를 적절하게 정의해주도록 하세요.

테스트에서는 receipt-data만 받아서 진행하도록 하겠습니다.

```java
public class UserReceipt {

    // TODO - User(구매자) 정보에 대한 Fields 필요.

    @JsonAlias("receipt-data")
    private String receiptData;

    public String getReceiptData() {
        return receiptData;
    }

    public void setReceiptData(String receiptData) {
        this.receiptData = receiptData;
    }
}
```

## 2. App Store에게 receipt-data 검증 요청 (/verifyReceipt)
[그림 1]에서 "4-1. 영수증 검증 요청" 프로세스 부분입니다.

```java
// AppleUtils.java - 43 라인

public AppStoreResponse verifyReceipt(UserReceipt userReceipt) throws JsonProcessingException, IllegalStateException {

        Map<String, String> appStoreRequest = new HashMap<>();
        appStoreRequest.put("receipt-data", userReceipt.getReceiptData());
        // appStoreRequest.put("password", PASSWORD);

        String response = HttpClientUtils.doPost(APPLE_PRODUCTION_URL, appStoreRequest);
        AppStoreResponse appStoreResponse = objectMapper.readValue(response, AppStoreResponse.class);

        int statusCode = appStoreResponse.getStatus();
        if (statusCode == 21007) {
            response = HttpClientUtils.doPost(APPLE_SANDBOX_URL, appStoreRequest);
            appStoreResponse = objectMapper.readValue(response, AppStoreResponse.class);
        } else if (statusCode != 0) {
            verifyStatusCode(statusCode);
        }

        return appStoreResponse;
}
```

receipt-data 데이터와 함께 "POST https://buy.itunes.apple.com/verifyReceipt" 를 호출합니다.
호출 후 전달받은 JSON 응답 값에서 status 코드 값이 21007인 경우에는 "POST https://sandbox.itunes.apple.com/verifyReceipt" 를 다시 호출하도록 합니다.
(password는 자동 구독 갱신 상품에 대한 receipt-data 혹은 이력이 포함된 receipt-data를 검증하는 경우에 필요합니다.)

인 앱 결제 테스트를 진행하는 경우에는 Sandbox Test URL을 호출하여야 합니다.
[애플 공식 문서](https://developer.apple.com/documentation/appstorereceipts/verifyreceipt)에 따르면 Production URL을 먼저 호출하고 21007 코드를 받으면 Sandbox URL을 호출하여 계속 진행하라고 합니다.

## 3. 영수증 검증 후 응답받은 데이터를 DB에 저장
[그림 1]에서 "4-2. 영수증 검증 응답" 및 "4-3. 영수증 응답 데이터 저장" 프로세스 부분입니다.

```java
// AppleServiceImpl.java - 24 라인

public String updatePurchaseHistory(UserReceipt userReceipt) {

        AppStoreResponse appStoreResponse;
        try {
            appStoreResponse = appleUtils.verifyReceipt(userReceipt);
        } catch (Exception e) {
            logger.error("Verify receipt fail..");
            e.printStackTrace();
            return "Fail";
        }

        UserReceiptInfo userReceiptInfo = null;
        if (appStoreResponse.getReceipt().getInApp().size() == 1) { // 소모품 (Consumable)
            userReceiptInfo = getUserReceiptInfo(appStoreResponse.getReceipt().getInApp().get(0));
        } else {
            // TODO - 비소모품(Non-Consumable), 자동 갱신 구독(Auto-Renewable Subscription), 비자동 갱신 구독(Non-Renewable Subscription)에 대한 로직 필요.
        }

        logger.info("===== DATABASE INSERT IGNORE =====");
        logger.info("product_id ‣ " + userReceiptInfo.getProductId());
        logger.info("transaction_id ‣ " + userReceiptInfo.getTransactionId());
        logger.info("original_transaction_id ‣ " + userReceiptInfo.getOriginalTransactionId());
        logger.info("purchase_data_ms ‣ " + userReceiptInfo.getPurchaseDateMs());
        logger.info("expiration_date ‣ " + userReceiptInfo.getExpirationDate());
        logger.info("====================================");

        return "Success";
}
```

"/verifyReceipt"을 호출 후 응답받은 JSON 형태의 영수증(receipt) 데이터에서 필요한 값을 파싱 하고 데이터베이스에 저장하여 유저가 구매한 상품 이력을 관리해주어야 합니다.

저는 소모품 상품에 대한 영수증 데이터를 파싱 하여 데이터베이스에 저장하는 대신 logger로 찍었습니다.
실제 서비스에서 상품에 대한 정책과 DB에서 관리할 영수증 데이터가 정해지지 않았기 때문에 각 상품에 대한 상황을 체크하여 프로세스를 확인하는 게 목적이기 때문에 소모품 상품에 대한 영수증을 기반으로 로직을 작성하였습니다.

응답받은 영수증 데이터에서 소모품의 경우에는 in_app에 1건의 데이터만 존재합니다.
("비소모품, 자동 갱신 구독, 비자동 갱신 구독" 상품의 결제를 진행했다면 소모품 상품 외 이력이 in_app에 존재합니다.
또한 트랜잭션이 종료되지 않은 상품의 경우에도 이력이 존재합니다.)

Apple에게 "/verifyReceipt" API 요청 후 응답받은 상품 별 영수증 데이터(JSON)는 아래와 같습니다.
JSON의 Properties 설명은 [공식 문서](https://developer.apple.com/documentation/appstorereceipts/responsebody)를 참고해주세요.

```json title="소모품(Consumable) 영수증 데이터 (JSON)"
{
  "receipt":{
    "receipt_type":"ProductionSandbox",
    "adam_id":0,
    "app_item_id":0,
    "bundle_id":"com.whitepaek.apps",
    "application_version":"1",
    "download_id":0,
    "version_external_identifier":0,
    "receipt_creation_date":"2020-11-30 04:02:18 Etc\/GMT",
    "receipt_creation_date_ms":"1606708938000",
    "receipt_creation_date_pst":"2020-11-29 20:02:18 America\/Los_Angeles",
    "request_date":"2020-11-30 04:03:44 Etc\/GMT",
    "request_date_ms":"1606709024832",
    "request_date_pst":"2020-11-29 20:03:44 America\/Los_Angeles",
    "original_purchase_date":"2013-08-01 07:00:00 Etc\/GMT",
    "original_purchase_date_ms":"1375340400000",
    "original_purchase_date_pst":"2013-08-01 00:00:00 America\/Los_Angeles",
    "original_application_version":"1.0",
    "in_app":[
      {
        "quantity":"1",
        "product_id":"products.consumable",
        "transaction_id":"1000000747843075",
        "original_transaction_id":"1000000747843075",
        "purchase_date":"2020-11-30 04:02:18 Etc\/GMT",
        "purchase_date_ms":"1606708938000",
        "purchase_date_pst":"2020-11-29 20:02:18 America\/Los_Angeles",
        "original_purchase_date":"2020-11-30 04:02:18 Etc\/GMT",
        "original_purchase_date_ms":"1606708938000",
        "original_purchase_date_pst":"2020-11-29 20:02:18 America\/Los_Angeles",
        "is_trial_period":"false"
      }
    ]
  },
  "environment":"Sandbox",
  "status":0
}
```

<br />

```json title="비소모품(Non-Consumable) 영수증 데이터 (JSON)"
{
  "receipt":{
    "receipt_type":"ProductionSandbox",
    "adam_id":0,
    "app_item_id":0,
    "bundle_id":"com.whitepaek.apps",
    "application_version":"1",
    "download_id":0,
    "version_external_identifier":0,
    "receipt_creation_date":"2020-11-30 04:18:33 Etc\/GMT",
    "receipt_creation_date_ms":"1606709913000",
    "receipt_creation_date_pst":"2020-11-29 20:18:33 America\/Los_Angeles",
    "request_date":"2020-11-30 04:19:15 Etc\/GMT",
    "request_date_ms":"1606709955191",
    "request_date_pst":"2020-11-29 20:19:15 America\/Los_Angeles",
    "original_purchase_date":"2013-08-01 07:00:00 Etc\/GMT",
    "original_purchase_date_ms":"1375340400000",
    "original_purchase_date_pst":"2013-08-01 00:00:00 America\/Los_Angeles",
    "original_application_version":"1.0",
    "in_app":[
      {
        "quantity":"1",
        "product_id":"products.nonConsumable",
        "transaction_id":"1000000747845239",
        "original_transaction_id":"1000000747845239",
        "purchase_date":"2020-11-30 04:18:33 Etc\/GMT",
        "purchase_date_ms":"1606709913000",
        "purchase_date_pst":"2020-11-29 20:18:33 America\/Los_Angeles",
        "original_purchase_date":"2020-11-30 04:18:33 Etc\/GMT",
        "original_purchase_date_ms":"1606709913000",
        "original_purchase_date_pst":"2020-11-29 20:18:33 America\/Los_Angeles",
        "is_trial_period":"false"
      }
    ]
  },
  "environment":"Sandbox",
  "status":0
}
```

<br />

```json title="자동 갱신 구독(Auto-Renewable Subscription) 영수증 데이터 (JSON)"
{
  "environment":"Sandbox",
  "receipt":{
    "receipt_type":"ProductionSandbox",
    "adam_id":0,
    "app_item_id":0,
    "bundle_id":"com.whitepaek.apps",
    "application_version":"1",
    "download_id":0,
    "version_external_identifier":0,
    "receipt_creation_date":"2020-11-30 04:22:32 Etc\/GMT",
    "receipt_creation_date_ms":"1606710152000",
    "receipt_creation_date_pst":"2020-11-29 20:22:32 America\/Los_Angeles",
    "request_date":"2020-11-30 04:23:30 Etc\/GMT",
    "request_date_ms":"1606710210501",
    "request_date_pst":"2020-11-29 20:23:30 America\/Los_Angeles",
    "original_purchase_date":"2013-08-01 07:00:00 Etc\/GMT",
    "original_purchase_date_ms":"1375340400000",
    "original_purchase_date_pst":"2013-08-01 00:00:00 America\/Los_Angeles",
    "original_application_version":"1.0",
    "in_app":[
      {
        "quantity":"1",
        "product_id":"products.autoRenewableSubscription",
        "transaction_id":"1000000747846047",
        "original_transaction_id":"1000000747846047",
        "purchase_date":"2020-11-30 04:22:31 Etc\/GMT",
        "purchase_date_ms":"1606710151000",
        "purchase_date_pst":"2020-11-29 20:22:31 America\/Los_Angeles",
        "original_purchase_date":"2020-11-30 04:22:32 Etc\/GMT",
        "original_purchase_date_ms":"1606710152000",
        "original_purchase_date_pst":"2020-11-29 20:22:32 America\/Los_Angeles",
        "expires_date":"2020-11-30 04:25:31 Etc\/GMT",
        "expires_date_ms":"1606710331000",
        "expires_date_pst":"2020-11-29 20:25:31 America\/Los_Angeles",
        "web_order_line_item_id":"1000000057838979",
        "is_trial_period":"false",
        "is_in_intro_offer_period":"false"
      }
    ]
  },
  "latest_receipt_info":[
    {
      "quantity":"1",
      "product_id":"products.autoRenewableSubscription",
      "transaction_id":"1000000747846047",
      "original_transaction_id":"1000000747846047",
      "purchase_date":"2020-11-30 04:22:31 Etc\/GMT",
      "purchase_date_ms":"1606710151000",
      "purchase_date_pst":"2020-11-29 20:22:31 America\/Los_Angeles",
      "original_purchase_date":"2020-11-30 04:22:32 Etc\/GMT",
      "original_purchase_date_ms":"1606710152000",
      "original_purchase_date_pst":"2020-11-29 20:22:32 America\/Los_Angeles",
      "expires_date":"2020-11-30 04:25:31 Etc\/GMT",
      "expires_date_ms":"1606710331000",
      "expires_date_pst":"2020-11-29 20:25:31 America\/Los_Angeles",
      "web_order_line_item_id":"1000000057838979",
      "is_trial_period":"false",
      "is_in_intro_offer_period":"false",
      "subscription_group_identifier":"20704611"
    }
  ],
  "latest_receipt":"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\/Qrk8H9Pm\/KwfU8qY9SGsAlCnYO3v6Z\/v\/Ca\/VbXqxzUUkIVonMQ5DMjoEC0KCXtlyxoWlph5AQaCYmObgdEHOwCl3Fc9DfdjvYLdmIHuPsB8\/ijtDT+iZVge\/iA0kjAgMBAAGjggHXMIIB0zA\/BggrBgEFBQcBAQQzMDEwLwYIKwYBBQUHMAGGI2h0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDMtd3dkcjA0MB0GA1UdDgQWBBSRpJz8xHa3n6CK9E31jzZd7SsEhTAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFIgnFwmpthhgi+zruvZHWcVSVKO3MIIBHgYDVR0gBIIBFTCCAREwggENBgoqhkiG92NkBQYBMIH+MIHDBggrBgEFBQcCAjCBtgyBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMDYGCCsGAQUFBwIBFipodHRwOi8vd3d3LmFwcGxlLmNvbS9jZXJ0aWZpY2F0ZWF1dGhvcml0eS8wDgYDVR0PAQH\/BAQDAgeAMBAGCiqGSIb3Y2QGCwEEAgUAMA0GCSqGSIb3DQEBBQUAA4IBAQANphvTLj3jWysHbkKWbNPojEMwgl\/gXNGNvr0PvRr8JZLbjIXDgFnf4+LXLgUUrA3btrj+\/DUufMutF2uOfx\/kd7mxZ5W0E16mGYZ2+FogledjjA9z\/Ojtxh+umfhlSFyg4Cg6wBA3LbmgBDkfc7nIBf3y3n8aKipuKwH8oCBc2et9J6Yz+PWY4L5E27FMZ\/xuCk\/J4gao0pfzp45rUaJahHVl0RYEYuPBX\/UIqc9o2ZIAycGMs\/iNAGS6WGDAfK+PdcppuVsq1h1obphC9UynNxmbzDscehlD86Ntv0hgBgw2kivs3hi1EdotI9CO\/KBpnBcbnoB7OUdFMGEvxxOoMIIEIjCCAwqgAwIBAgIIAd68xDltoBAwDQYJKoZIhvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTEzMDIwNzIxNDg0N1oXDTIzMDIwNzIxNDg0N1owgZYxCzAJBgNVBAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDKOFSmy1aqyCQ5SOmM7uxfuH8mkbw0U3rOfGOAYXdkXqUHI7Y5\/lAtFVZYcC1+xG7BSoU+L\/DehBqhV8mvexj\/avoVEkkVCBmsqtsqMu2WY2hSFT2Miuy\/axiV4AOsAX2XBWfODoWVN2rtCbauZ81RZJ\/GXNG8V25nNYB2NqSHgW44j9grFU57Jdhav06DwY3Sk9UacbVgnJ0zTlX5ElgMhrgWDcHld0WNUEi6Ky3klIXh6MSdxmilsKP8Z35wugJZS3dCkTm59c3hTO\/AO0iMpuUhXf1qarunFjVg0uat80YpyejDi+l5wGphZxWy8P3laLxiX27Pmd3vG2P+kmWrAgMBAAGjgaYwgaMwHQYDVR0OBBYEFIgnFwmpthhgi+zruvZHWcVSVKO3MA8GA1UdEwEB\/wQFMAMBAf8wHwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01\/CF4wLgYDVR0fBCcwJTAjoCGgH4YdaHR0cDovL2NybC5hcHBsZS5jb20vcm9vdC5jcmwwDgYDVR0PAQH\/BAQDAgGGMBAGCiqGSIb3Y2QGAgEEAgUAMA0GCSqGSIb3DQEBBQUAA4IBAQBPz+9Zviz1smwvj+4ThzLoBTWobot9yWkMudkXvHcs1Gfi\/ZptOllc34MBvbKuKmFysa\/Nw0Uwj6ODDc4dR7Txk4qjdJukw5hyhzs+r0ULklS5MruQGFNrCk4QttkdUGwhgAqJTleMa1s8Pab93vcNIx0LSiaHP7qRkkykGRIZbVf1eliHe2iK5IaMSuviSRSqpd1VAKmuu0swruGgsbwpgOYJd+W+NKIByn\/c4grmO7i77LpilfMFY0GCzQ87HUyVpNur+cmV6U\/kTecmmYHpvPm0KdIBembhLoz2IYrF+Hjhga6\/05Cdqa3zr\/04GpZnMBxRpVzscYqCtGwPDBUfMIIEuzCCA6OgAwIBAgIBAjANBgkqhkiG9w0BAQUFADBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMKQXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNVBAMTDUFwcGxlIFJvb3QgQ0EwHhcNMDYwNDI1MjE0MDM2WhcNMzUwMjA5MjE0MDM2WjBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMKQXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNVBAMTDUFwcGxlIFJvb3QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDkkakJH5HbHkdQ6wXtXnmELes2oldMVeyLGYne+Uts9QerIjAC6Bg++FAJ039BqJj50cpmnCRrEdCju+QbKsMflZ56DKRHi1vUFjczy8QPTc4UadHJGXL1XQ7Vf1+b8iUDulWPTV0N8WQ1IxVLFVkds5T39pyez1C6wVhQZ48ItCD3y6wsIG9wtj8BMIy3Q88PnT3zK0koGsj+zrW5DtleHNbLPbU6rfQPDgCSC7EhFi501TwN22IWq6NxkkdTVcGvL0Gz+PvjcM3mo0xFfh9Ma1CWQYnEdGILEINBhzOKgbEwWOxaBDKMaLOPHd5lc\/9nXmW8Sdh2nzMUZaF3lMktAgMBAAGjggF6MIIBdjAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH\/BAUwAwEB\/zAdBgNVHQ4EFgQUK9BpR5R2Cf70a40uQKb3R01\/CF4wHwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01\/CF4wggERBgNVHSAEggEIMIIBBDCCAQAGCSqGSIb3Y2QFATCB8jAqBggrBgEFBQcCARYeaHR0cHM6Ly93d3cuYXBwbGUuY29tL2FwcGxlY2EvMIHDBggrBgEFBQcCAjCBthqBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMA0GCSqGSIb3DQEBBQUAA4IBAQBcNplMLXi37Yyb3PN3m\/J20ncwT8EfhYOFG5k9RzfyqZtAjizUsZAS2L70c5vu0mQPy3lPNNiiPvl4\/2vIB+x9OYOLUyDTOMSxv5pPCmv\/K\/xZpwUJfBdAVhEedNO3iyM7R6PVbyTi69G3cN8PReEnyvFteO3ntRcXqNx+IjXKJdXZD9Zr1KIkIxH3oayPc4FgxhtbCS+SsvhESPBgOJ4V9T0mZyCKM2r3DYLP3uujL\/lTaltkwGMzd\/c6ByxW69oPIQ7aunMZT7XZNn\/Bh1XZp5m5MkL72NVxnn6hUrcbvZNCJBIqxw8dtk2cXmPIS4AXUKqK1drk\/NAJBzewdXUhMYIByzCCAccCAQEwgaMwgZYxCzAJBgNVBAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkCCA7rV4fnngmNMAkGBSsOAwIaBQAwDQYJKoZIhvcNAQEBBQAEggEAKW5ec5xp9kgM8xy++jeQ5SNJaNR5PDPEbxLPvpC6tVRKJokBNePdhxdZ1fNP3ghxU2sY6BsjTw3ir4Hxe2YC0lCsap32lncG0sCPnifMKaAN7IlyFTF27Ubl0d8ete7THiSzqz5ZOiVG2sBoYNDe0v107HS7w929twp7uLyDwim3GqMFdpv+IdNUJ6g2e94r\/Zo3nVwzRNge\/CD1Lj6oVTKqNdU2QiyiuZN5804mi9dToXZxHk8ihL4tflSA6Aqfm\/DisJgwc9gmwhwuRVl6DiaZZmitoMn0AberUDh1LheGg9cA0pL7fZfZ7UCC00ELh71X07cKelWb8i1Q\/PECvQ==",
  "pending_renewal_info":[
    {
      "auto_renew_product_id":"products.autoRenewableSubscription",
      "original_transaction_id":"1000000747846047",
      "product_id":"products.autoRenewableSubscription",
      "auto_renew_status":"1"
    }
  ],
  "status":0
}
```

<br />

```json title="비자동 갱신 구독(Non-Renewable Subscription) 영수증 데이터 (JSON)"
{
  "receipt":{
    "receipt_type":"ProductionSandbox",
    "adam_id":0,
    "app_item_id":0,
    "bundle_id":"com.whitepaek.apps",
    "application_version":"1",
    "download_id":0,
    "version_external_identifier":0,
    "receipt_creation_date":"2020-11-30 04:29:57 Etc\/GMT",
    "receipt_creation_date_ms":"1606710597000",
    "receipt_creation_date_pst":"2020-11-29 20:29:57 America\/Los_Angeles",
    "request_date":"2020-11-30 04:30:32 Etc\/GMT",
    "request_date_ms":"1606710632165",
    "request_date_pst":"2020-11-29 20:30:32 America\/Los_Angeles",
    "original_purchase_date":"2013-08-01 07:00:00 Etc\/GMT",
    "original_purchase_date_ms":"1375340400000",
    "original_purchase_date_pst":"2013-08-01 00:00:00 America\/Los_Angeles",
    "original_application_version":"1.0",
    "in_app":[
      {
        "quantity":"1",
        "product_id":"products.nonRenewableSubscription",
        "transaction_id":"1000000747847882",
        "original_transaction_id":"1000000747847882",
        "purchase_date":"2020-11-30 04:29:57 Etc\/GMT",
        "purchase_date_ms":"1606710597000",
        "purchase_date_pst":"2020-11-29 20:29:57 America\/Los_Angeles",
        "original_purchase_date":"2020-11-30 04:29:57 Etc\/GMT",
        "original_purchase_date_ms":"1606710597000",
        "original_purchase_date_pst":"2020-11-29 20:29:57 America\/Los_Angeles",
        "is_trial_period":"false"
      }
    ]
  },
  "environment":"Sandbox",
  "status":0
}
```

---

이제부터는 해당 로직에서 발생할 수 있는 이슈를 확인해 보도록 하겠습니다.

![[./images/img_03.png|그림 3: 인 앱 결제 프로세스 이슈(In-App Purchase Process Issue)]]

구매한 상품의 트랜잭션이 정상적으로 종료되지 않는 문제에 대해 아래와 같은 케이스를 생각해볼 수 있습니다.

1. App에서 발생한 문제 <br />
1-1. App에서 receipt-data를 Server에 전달하기 전 비정상적으로 종료된 경우 <br />
1-2. App에서 receipt-data를 Server에 전달한 후 비정상적으로 종료된 경우 <br />
1-3. App에서 구매 완료(트랜잭션 종료) 후 Server에게 구매 완료 요청 API를 호출하기 전 종료된 경우

2. Server에서 발생한 문제 <br />
2-1. 데이터베이스에 영수증 데이터를 저장 후 Server 문제 발생으로 App에게 응답 값을 전달하지 못한 경우 <br />
2-2. 영수증 검증 오류와 같은 이슈로 데이터베이스에 저장하지 못하고 App에게 실패(fail)의 응답 값을 전달한 경우

위 5가지의 문제에 대해 제가 생각해본 해결 포인트는 아래와 같습니다.

1-1. App이 재구동될 때 종료되지 않은 트랜잭션의 receipt-data를 재생성하여 Server에 재요청하기 때문에 Server 쪽에서는 신경 쓸 부분이 없다. <br />
‣ App에서 처리해야하는 이슈

1-2. App이 재구동 되면서 종료되지 않은 트랜잭션의 receipt-data를 재생성하여 Server에 재요청 한다.
이 경우에 Server는 기존 로직을 동일하게 진행하나 데이터베이스에 중복으로 유저의 상품 정보가 존재하는지 확인해야 한다. <br />
‣ App & Server에서 처리해야하는 이슈

1-3. App에서 유저의 구매 이력과 DB에 저장된 유저의 구매 이력을 비교하여 DB를 현행화 해주는 Server 로직이 필요하다.
이 경우에는 어떻게 처리해야 할까.. 댓글로 의견 부탁드리겠습니다. <br />
‣ 고객이 결제를 했으나, 상품 구매가 정상적으로 이루어지지 않았기 때문에 고객센터를 통해 문의를 한다. (?)

2-1. App은 일정시간 동안 응답 값을 받지 못하면 Server에 재요청한다.
일정시간 혹은 재요청 후에도 응답 값을 받지 못하면 App은 결제 실패에 대한 트랜잭션을 처리할 로직을 구현해야 한다.
(서버에 문제가 발생한 경우에는 서비스 전체 장애이기 때문에 절대 발생하는 일이 없기를..) <br />
‣ App & Server에서 처리해야하는 이슈

2-2. App은 실패에 대한 응답 값을 전달받았기 때문에 Server에 재요청 한다.
이 경우에는 Apple 쪽 문제 혹은 Server에서 데이터 처리 과정에서 발생한 문제이기 때문에 관련 로그를 적절하게 남기고 빠른 시간 내에 장애를 처리해야 한다.
(마찬가지로 발생해서는 안되는 문제이지만 만약 발생한 경우 App 쪽에서 결제 실패에 대한 트랜잭션을 처리할 로직을 구현해야한다.) <br />
‣ App & Server에서 처리해야하는 이슈

로직에서 고려해야 할 사항은 **(1) "비소모품, 자동 갱신 구독, 비자동 갱신 구독" 상품의 구매 이력이 존재하는 영수증 데이터에 대한 처리**와
**(2) 1-2 이슈 상황에 대한 부분**일 거라고 생각합니다. 아래에서 두 가지 상황에 대해서 얘기를 해보겠습니다.

#### 1. 구매 이력이 존재하는 영수증

in_app 프로퍼티에 상품의 구매 이력이 존재하는 영수증 데이터를 처리하는 로직은 현재 코드에서 구현하지 않았습니다.
이유는 서비스 정책이 정해지지 않은 상황이지만, 앱 내에서 사용하는 "기간제 & 무기한"의 상품을 다룰 예정이고
유저의 구매 상품과 기간을 서버에서 관리할 것이기 때문에 transaction_id가 일관성 있게 유지되는 **소모품(Consumable)** 옵션이 적절하다고 판단하였기 때문입니다.

"비소모품, 자동 갱신 구독, 비자동 갱신 구독" 상품의 경우에는 App에서 **복원(Restore)** 기능을 구현해야 합니다.
복원 기능을 구현하지 않는다면 App Store에서 거절(reject) 사유에 해당되기 때문입니다.
또한 복원을 하는 경우 transaction_id가 변경되어 구매 이력이 추가적으로 생성되기 때문에 앱 내에서 사용하는 상품을 관리하기에는 적절하지 않다고 판단하였습니다.

```java
// AppleServiceImpl.java - 35 라인

UserReceiptInfo userReceiptInfo = null;
if (appStoreResponse.getReceipt().getInApp().size() == 1) { // 소모품 (Consumable)
	userReceiptInfo = getUserReceiptInfo(appStoreResponse.getReceipt().getInApp().get(0));
} else {
	// TODO - 비소모품(Non-Consumable), 자동 갱신 구독(Auto-Renewable Subscription), 비자동 갱신 구독(Non-Renewable Subscription)에 대한 로직 필요.
}
```
해당 부분에서 본인의 서비스 정책에 따른 상품의 영수증(receipt)에서 필요한 데이터를 파싱 하는 로직을 구현하면 됩니다.
(추후에 정책이 정해지면 적절한 프로세스를 구현해보고 좀 더 자세하게 설명을 추가해보도록 하겠습니다.)

#### 2. App에서 receipt-data를 Server에 전달한 후 비정상적으로 종료된 경우

App에서는 receipt-data를 Server에 전달하였고 Server에서는 영수증 검증까지 완료하고 유저의 구매 상품의 정보를
데이터베이스에 정상적으로 저장까지 완료하고 성공(Success)에 대한 응답 값을 App에게 전달하였으나,
App이 비정상적으로 종료되어서 Server에서 보낸 성공에 대한 응답 값을 못 받았기 때문에 구매 트랜잭션을 종료하지 못한 상황입니다.

이 경우에는 App이 재 구동된 시점에 종료되지 않은 트랜잭션에 대한 receipt-data를 재생성하여 Server에 다시 요청합니다.
하지만 유저가 구매한 상품에 대한 정보가 데이터베이스에 저장된 상황이기 때문에 Server는 transaction_id를 이용하여 데이터베이스에 저장된 데이터가 있는지 확인하고
데이터가 존재한다면 App에게 성공(Success)에 대한 응답 값을 전달해주면 됩니다.

```java
// AppleServiceImpl.java - 42 라인

logger.info("===== DATABASE INSERT IGNORE =====");
logger.info("product_id ‣ " + userReceiptInfo.getProductId());
logger.info("transaction_id ‣ " + userReceiptInfo.getTransactionId());
logger.info("original_transaction_id ‣ " + userReceiptInfo.getOriginalTransactionId());
logger.info("purchase_data_ms ‣ " + userReceiptInfo.getPurchaseDateMs());
logger.info("expiration_date ‣ " + userReceiptInfo.getExpirationDate());
logger.info("====================================");
```

데이터베이스에 저장하는 로직은 현재 구현하지 않았고 logger로 필요한 데이터를 출력하였습니다.
이미 존재하는 데이터에 대한 중복 저장에 대해서는 INSERT IGNORE를 이용하여 처리하면 어떨까 하는 의견입니다.

마찬가지로 데이터베이스에서 관리할 상품 정보가 정해지지 않아서 몇 가지의 데이터만 뽑아서 확인했습니다.
애플 공식 문서에서는 **transaction_id, original_transaction_id, product_id**를 기준으로 데이터베이스에서 상품을 관리하길 권장합니다.

저는 데이터베이스에서 "기간제 & 무기한" 상품을 관리할 예정이기 때문에 "transaction_id, original_transaction_id, product_id" 외에도
상품을 구매한 유저의 정보와 구매한 상품에 대한 기간으로 계산한 만료 기간 등 추가로 넣어줄 예정입니다.

## 4. 데이터베이스에 유저가 구매한 상품 정보를 정상적으로 저장하였다면 App에게 성공(Success)에 대한 응답 값 반환
[그림 1]에서 "4-4. 상품 결제 검증 응답" 프로세스 부분입니다.

```java
// AppleController.java - 19 라인

@PostMapping("/purchase")
public ResponseEntity purchase(@RequestBody UserReceipt userReceipt) {

	String code = appleService.updatePurchaseHistory(userReceipt);

	return ResponseEntity.ok(code);
}
```

이상으로 애플(Apple) 인 앱 결제(In-App Purchase)에 대한 프로세스를 알아봤습니다.

가장 중요한 것은 서비스에 대한 정책을 어떻게 정하느냐에 따라 로직이 달라질 것입니다.
인 앱 결제에서 관리할 데이터와 프로세스가 정해진다면 프로토타입으로 간단하게 작성한 로직을 좀 더 구체화시킬 수 있을 거 같습니다.

해당 글 내용은 개인적인 판단으로 임의의 서비스 정책을 정한 후 작성한 글입니다.
또한 코드를 작성하는 실력이 아직 많이 부족하기 때문에 부족함이 많은 프로토타입의 코드입니다.
애플의 인 앱 결제(In-App Purchase) 프로세스를 이해하는 부분에서 도움이 되었으면 합니다.

인 앱 결제에서 사용되는 4가지 종류의 상품과 다양한 방식의 예외 사항을 테스트해봤습니다.
프로세스 흐름에 따라 글을 작성하다 보니 제가 경험한 전부를 내용에 넣지는 못했습니다.