---
title: IntelliJ에서 Spring Boot 멀티 모듈 구성
created: 2025-06-17
modified: 2025-06-17
tags: []
---

Spring Boot 모듈 구성하는 방법을 작성한다.
반복적으로 하는 작업도 아니어서 새롭게 프로젝트 구성이 필요할 때마다 설정 옵션 등 다시 찾아보며 기억을 되살리기 위한 시간을 소비하게 된다.

기본적인 설정 방법부터 작성해서 모듈 구성을 진행할 때,
변경 또는 추가되는 내용이 있는 경우에는 해당 글을 업데이트하며 반복적으로 소비되는 시간을 줄이고자 작성한다.

#### 버전 정보
- IntelliJ IDEA : 2025.1.2
- Java : 21
- Spring Boot : 3.5.0

---

## Spring Boot Module 구성 시작하기

`IntelliJ`에서 `New Project`를 클릭하여 `Generators > Spring Boot`로 프로젝트 생성을 진행한다.

![[./images/img_01.png|그림 1: Spring Initializr로 프로젝트 생성]]

[그림 1]에서 프로젝트 생성할 때 설정하는 항목에 대한 설명이 필요하면 다음 표를 참고하도록 한다.

| **항목** | **설명** |
| --- | --- |
| Name | 프로젝트 이름 (Artifact와 동일하게 설정 권장) |
| Location | 프로젝트 저장 경로 |
| Language | 프로젝트 개발 언어 |
| Type | 프로젝트 빌드 도구 |
| Group | 프로젝트 식별 그룹 ID (회사/조직의 도메인 이름 역순 권장. e.g., `io.github`) |
| Artifact | 프로젝트 식별 이름 |
| Package name | 패키지 이름 (Group ID + Artifact ID 조합해서 생성 권장. e.g., `io.github.whitepaek`) |
| JDK | IntelliJ에서 프로젝트를 개발/실행에서 사용할 JDK |
| Java | 프로젝트에서 사용할 Java 버전 (JDK 버전과 동일하게 설정 권장) |
| Packaging | 빌드 패키징 방식 |
<br />

모듈에 따라 필요한 의존성을 추가할 것이기 때문에 [그림 2] 과정에서는 추가하지 않고 프로젝트를 생성한다.

![[./images/img_02.png|그림 2: Spring Boot 의존성 추가]]

프로젝트 생성을 완료했으면,
멀티 모듈 구성을 위해 `src` 디렉토리를 삭제하고 `build.gradle` 파일 수정을 진행하겠다.

![[./images/img_03.png|그림 3: 프로젝트 생성 완료]]

멀티 모듈 설정을 위해 루트 디렉토리의 `build.gradle` 파일을 아래 스크립트를 참고해 수정한다.
스크립트의 간단한 설명은 주석으로 작성했다.

```groovy title="build.gradle"
plugins {
    id 'java'

    // apply false : 루트 프로젝트에 적용하지 않고, 각 모듈에서 개별적으로 적용한다.
    id 'org.springframework.boot' version '3.5.0' apply false // Spring Boot 프로젝트 빌드/실행에 필요한 플러그인
    id 'io.spring.dependency-management' version '1.1.7' apply false // Spring Boot 의존성 관리를 위한 플러그인
}

group = 'com.whitepaek' // 프로젝트 그룹 ID
version = '0.0.1-SNAPSHOT' // 프로젝트 버전

java {
    // 프로젝트 빌드에 사용할 JDK를 찾거나 다운로드
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

configurations {
    // 컴파일 시에만 필요한 의존성을 정의
    compileOnly {
        extendsFrom annotationProcessor
    }
}

repositories {
    mavenCentral() // 프로젝트 의존성을 다운로드할 저장소
}

// 모든 서브 프로젝트(모듈)에 공통적으로 적용이 필요한 설정을 정의
subprojects {
    apply plugin: 'java'

    // 서브 프로젝트의 그룹 ID, 버전
    group = 'com.whitepaek'
    version = '0.0.1-SNAPSHOT'

    // 서브 프로젝트에서도 Maven Central Repository에서 의존성을 다운로드하도록 설정
    repositories {
        mavenCentral()
    }

    // 서브 프로젝트에 공통적으로 적용할 의존성 정의
    dependencies {
        compileOnly 'org.projectlombok:lombok'
        annotationProcessor 'org.projectlombok:lombok'

        testImplementation 'org.springframework.boot:spring-boot-starter-test'
        testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
    }

    // 서브 프로젝트의 test 작업에 JUnit 5 사용하도록 설정
    tasks.named('test') {
        useJUnitPlatform()
    }
}
```

![[./images/img_04.png|그림 4: src 디렉토리 삭제 및 루트 build.gradle 스크립트 작성]]

루트 프로젝트의 `build.gradle` 설정을 완료했으면, 루트 프로젝트에 모듈을 생성하도록 한다.

![[./images/img_05.png|그림 5: 모듈(서브 프로젝트) 생성]]

모듈은 좌측에 `New Module > Java`를 선택해서 생성하도록 한다.
모든 모듈에서 공통적으로 사용할 코드 개발을 위해 `common` 모듈을 먼저 생성하겠다.

![[./images/img_06.png|그림 6: common 모듈 생성 진행]]

`common` 모듈이 추가됐으면, 모듈에 포함된 `build.gradle` 파일의 스크립트 설정을 진행하겠다.

![[./images/img_07.png|그림 7: common 모듈 생성 완료]]

모듈에 포함된 `build.gradle` 설정은 해당 모듈에만 적용된다.
해당 모듈에서 사용할 플러그인과 의존성 스크립트를 작성하도록 한다.
우선 `common` 모듈에서 Spring Boot를 사용할 예정이기 때문에 관련 플러그인을 추가하고, 필요한 의존성은 이후 추가하도록 하겠다.

```grovvy title="build.gradle (common)"
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.5.0'
    id 'io.spring.dependency-management' version '1.1.7'
}

dependencies {

}
```

![[./images/img_08.png|그림 8: common 모듈의 build.gradle 스크립트 작성]]

`[그림 5] ~ [그림 8]` 과정을 반복해서 필요한 모듈을 추가하고,
루트 프로젝트의 `settings.gradle` 파일에 추가한 모듈을 정의하도록 한다.
(모듈을 생성하면 `IntelliJ`에서 `settings.gradle` 파일에 자동으로 추가한다. 만약, 추가가 안되어 있다면 직접 작성한다.)

```grovvy title="settings.gradle"
rootProject.name = 'whitepaek-service'

include 'common'
include 'client-api'
include 'backoffice-api'
```

![[./images/img_09.png|그림 9: settings.gradle 파일에 생성한 모듈 정의]]

`client-api`, `backoffice-api` 모듈을 추가하고, `common` 모듈을 의존성으로 설정해 필요한 공통 코드를 사용하도록 하겠다.
이로써 기본적인 멀티 모듈 설정은 완료되었다.

지금까지 설정한 멀티 모듈 구조와 파일에 대한 정리된 내용은 다음과 같다.
```text
root-project
├── backoffice-api
│   ├── src/
│   └── build.gradle // backoffice-api 모듈 설정 (플러그인, 의존성 등)
├── client-api
│   ├── src/
│   └── build.gradle // client-api 모듈 설정 (플러그인, 의존성 등)
├── common           // backoffice-api, client-api 에서 사용되는 공통 모듈
│   ├── src/
│   └── build.gradle // common 모듈 설정 (플러그인, 의존성 등)
├── build.gradle     // 루트 프로젝트 또는 모든 모듈에 공통적으로 적용이 필요한 설정 정의
└── setting.gradle   // 생성한 모듈 정의
```

## Spring Boot Module 실행하기

구성한 멀티 모듈의 애플리케이션이 정상적으로 실행되는지 테스트해 보도록 하겠다.
각 API 모듈은 공통 모듈 `common`을 의존성으로 추가해 공통 코드와 의존성을 사용하며, 테스트는 `common ---> client-api` 모듈로 진행하겠다.

- `common ---> client-api`
- `common ---> backoffice-api`

`common` 모듈에 `H2 Database` 의존성을 추가해 API 모듈에서 공통으로 사용하겠다.
`common` 모듈의 `build.gradle` 파일에 의존성을 추가하도록 한다.

```groovy title="build.gradle (common)"
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.5.0'
    id 'io.spring.dependency-management' version '1.1.7'
}

dependencies {
    runtimeOnly 'com.h2database:h2'
}
```

![[./images/img_10.png|그림 10: common 모듈 의존성 추가]]

`client-api` 모듈의 `build.gradle` 파일에는 `common` 모듈과 `web`, `actuator` 의존성을 추가해서
`common` 모듈에 정의한 H2 Database와 Spring Boot Application 실행이 정상적으로 되는지 확인하겠다.

```groovy title="build.gradle (client-api)"
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.5.0'
    id 'io.spring.dependency-management' version '1.1.7'
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-actuator'

    implementation project(':common') // common 모듈 추가
}
```

![[./images/img_11.png|그림 11: client-api 모듈 의존성 추가]]

`client-api` 모듈에 `application.yml` 파일을 생성해서 `H2 Database` 실행을 위한 콘솔 정보를 설정한다.

```yaml title="application.yml"
spring:
  h2:
    console:
      enabled: true
      path: /h2-console
```

![[./images/img_12.png|그림 12: client-api 모듈에 H2 Database 콘솔 정보 설정]]

`client-api` 애플리케이션 실행을 위해 `ClientApplication.class` 코드를 작성하고,
멀티 모듈로 구성한 애플리케이션이 정상적으로 동작하는지 확인하기 위해 실행하도록 한다.

![[./images/img_13.png|그림 13: SpringBootApplication 설정]]

`ClientApplication` 실행을 완료했으면,
`http://localhost:8080/h2-console` 접속하여 공통 모듈에 추가한 `H2 Database`의 콘솔에 접속되는지 확인한다.

![[./images/img_14.png|그림 14: common 공통 모듈에 추가한 H2 Database 정상 동작]]

마찬가지로 `http://localhost:8080/actuator/health` 접속해서 Spring Boot Application 실행 상태를 확인한다.

![[./images/img_15.png|그림 15: client-api 모듈에 추가한 Spring Boot Actuator 정상 동작]]

이상으로 IntelliJ에서 Spring Boot 멀티 모듈을 구성하고 애플리케이션 실행까지 완료했다.