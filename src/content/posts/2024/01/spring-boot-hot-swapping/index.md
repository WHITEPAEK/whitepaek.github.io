---
title: 스프링 부트 JVM 핫 스와핑 (devtools, JRebel)
pubDate: 2024-01-30
draft: false
---

스프링 부트(Spring Boot) 애플리케이션 개발을 진행할 때, 코드를 변경하고 결과 확인을 위해 서버를 재시작하는 번거로움이 있어요.   
이런 번거로움을 해소하기 위한 [핫 스와핑(hot-swapping)](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto.hotswapping) 기능을 할 수 있는 솔루션이 있는데, **Devtools**와 **JRebel**이 있어요.   
Devtools와 JRebel에 대해 알아보고, macOS와 인텔리제이(IntelliJ IDEA) 환경에서 실행하는 방법을 확인해 볼게요.

## 1. Devtools
많은 분들이 스프링 부트 애플리케이션을 개발할 때 대표적으로 `spring-boot-devtools` 의존성을 추가하여 사용하고 있어요.   
devtools를 사용하면 **클래스, 리소스 파일을 변경하면 애플리케이션이 자동으로 재시작** 돼요.
그리고 **HTML, CSS, JavaScript 등 정적 리소스를 수정하고 브라우저를 새로고침 하면 변경 사항을 즉시 반영**할 수 있어요.
그뿐만 아니라 **properties, yml 파일의 설정 정보를 자동으로 적용**해 줘요.

devtools를 적용하고, 실행하는 방법을 알아볼게요.   
본인이 사용하고 있는 빌드 도구(Gradle, Maven)에 맞춰 의존성을 추가해 주세요.
```text
# build.gradle
developmentOnly 'org.springframework.boot:spring-boot-devtools'

# pom.xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <scope>test</scope>
</dependency>
```

devtools는 의존성만 추가하면 별도의 설정은 필요가 없어요. devtools가 동작하는지 확인을 위해 서버를 실행하고, 클래스 파일을 수정해 주세요.
클래스 파일 변경이 감지되면 자동으로 서버가 재시작되는 걸 확인할 수 있어요. 인텔리제이에서 포커스가 벗어나는 경우에 변경 감지가 이뤄지기 때문에 개인적으로 이 부분이 불편하다고 생각해요.
그래서 수동으로 **Command + Shift + F9** 단축키로 명확하게 변경된 코드를 적용하여, devtools의 변경 감지가 이뤄져서 서버가 재시작되는 걸 확인할 수 있어요.
![[1] devtools 실행 결과](./images/devtools-recomplie.png)

코드 변경이 일어날 때마다 자동으로 애플리케이션이 재시작되기 때문에 그 시간 동안 딜레이가 발생해요.
하지만 서버를 아예 멈췄다가 실행하는 콜드 스타트에 비해 빠르기 때문에 보다 쾌적한 개발을 진행할 수 있어요.

[devtools 사용할 때 한 가지 주의할 점](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.devtools)은 개발할 때만 사용하고, 운영 환경에서는 비활성화 해줘야 해요.
운영 환경에서 사용하게 되면 불필요한 자원이 낭비되고, 성능 저하 등 발생할 수 있어요.
그렇기 때문에 운영 환경에서는 `spring-boot-devtools` 의존성을 제거하거나 properties 또는 yml 파일에서 `spring.devtools.restart.enabled = false`로 설정해 주세요.

## 2. JRebel
JRebel도 devtools와 마찬가지로 클래스, 리소스 파일, 정적 파일 그리고 설정 파일에 대한 변경을 실시간으로 적용해 줘요.
devtools와 가장 큰 차이점으로는 **애플리케이션을 재시작하지 않고, 즉시 반영해 준다는 점**이에요.
devtools는 스프링 부트에서 사용되는 오픈 소스로 의존성만 추가하면 무료로 사용할 수 있지만, JRebel은 상용 소프트웨어로 플러그인을 설치하고 라이선스를 등록해야 사용할 수 있어요.

JRebel을 설정하고, 실행하는 방법을 알아볼게요.   
라이선스를 받기 위해 [JRebel 사이트](https://www.jrebel.com/products/jrebel/free-trial)에 접속 후 정보를 입력해 주세요.
![[2-1] JRebel 사이트에서 정보 등록](./images/jrebel-license.png)

입력한 이메일로 라이선스 정보를 받으면 라이선스 키를 복사해 주세요.
![[2-2] 메일로 라이선스 키 수신](./images/get-license.png)

인텔리제이를 실행하고, **Settings > Plugins > Marketplace**에서 **JRebel and XRebel** 플러그인을 설치해 주세요.
![[2-3] JRebel 플러그인 설치](./images/jrebel-plugin.png)

**Help > JRebel > Activation**을 클릭 후, 메일로 전달받은 라이선스 키를 입력하고 활성화해 주세요.
![[2-4] JRebel 라이선스 활성화](./images/activate-jrebel.png)

우측 상단에 JRebel 실행 버튼을 클릭하여 서버를 시작해 주세요.
![[2-5] JRebel 서버 실행](./images/run-jrebel.png)

JRebel이 동작하는지 확인을 위해 클래스 파일을 수정하고, **Command + Shift + F9** 단축키로 Recompile 해주세요.
(devtools와 동일하게 변경 감지가 이뤄지면 리컴파일 단축키를 누르지 않더라도 자동으로 실행돼요)   
그러면 애플리케이션 재시작 없이 변경된 파일이 적용되는 걸 확인할 수 있어요.
![[2-6] 변경된 클래스 파일 리로딩](./images/reloading-class.png)


JRebel에서 제공받은 평가판 라이선스는 14일 동안 유효하게 사용할 수 있어요.
제한 없이 라이선스를 사용하기 위해 유료 라이선스 가격을 문의해 봤더니, 연간 $655 라는 작지 않은 금액을 답변 받았어요.
![[2-7] 유료 라이선스 가격](./images/license-price.png)

개인이 구매하기에는 부담되는 금액으로 판단되고, 대신에 약간의 불편함을 감수하고 평가판 라이선스를 지속해서 사용할 수 있는 방법이 있어요.


홈 디렉터리로 이동 후 **.jrebel** 디렉터리를 제거해 주세요. (파인더(Finder)에서 직접 제거해도 돼요)   
그리고 인텔리제이를 재실행 후 [2-4] 이미지 과정을 다시 진행해 주세요.   
그러면 평가판 라이선스 기간이 14일로 초기화되어 사용할 수 있어요.
```bash
$ cd ~
$ rm -rf .jrebel/
```
![[2-8] .jrebel 디렉터리 삭제](./images/remove-jrebel.png)

기간이 만료될 때마다 해당 방법을 반복해야 하는 수고로움이 있지만, 그래도 JRebel 유료 라이선스 구매 없이 평가판 라이선스를 계속 사용할 수 있어요. 

---

개인적으로 devtools 보다 JRebel을 추천해요.
이유는 [devtools는 변경 시점마다 애플리케이션이 자동으로 재시작](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto.hotswapping.fast-application-restarts)되지만,
JRebel은 재시작 없이 변경된 파일을 바로 적용 해줘요.
그렇기 때문에 속도도 빠르고, JVM 핫 스와핑도 안정적으로 동작해요.

![[3] 스프링 부트 핫 스와핑에 대한 공식 문서](./images/fast-application-restarts.png)

또한 서버가 내려가지 않기 때문에 Memory DB를 사용하고 있다면 테스트 중이던 데이터가 유지돼요.
devtools는 서버가 재시작되면서 메모리가 날아가기 때문에 테스트 중이던 데이터를 다시 등록해야 한다는 불편한 점도 있거든요.
그리고 프로젝트에 의존성을 추가하지 않고, 인텔리제이 플러그인으로 설정하여 동작하기 때문에 devtools 처럼 의존성을 신경 쓰지 않아도 돼요.

JRebel로 디버깅을 켠 상태로 개발을 진행하면 쾌적한 개발 환경을 경험할 수 있어요!
1. JRebel 플러그인 설치 및 라이선스 활성화
2. "Settings > Keymap"에서 Rebel Debug 단축키를 Control + D로 설정
3. Control + D 단축키로 Debug with Rebel로 서버 실행
4. Command + Shift + F9 단축키로 Recompile 하여 변경된 코드 반영

이상으로 JVM 핫 스와핑 기능을 위한 Devtools와 JRebel에 대해 알아봤어요.