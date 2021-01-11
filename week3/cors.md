# CORS
도메인 또는 포트가 다른 서버의 자원을 요청하는 매커니즘

<br/>

<strong>사전 정의</strong>

```
동일 출처 정책(same-origin policy)
불러온문서나 스크립트가 다른 출처에서 가져온 리소스와 상호작용하는 것을 제한하는 중요한 보안 방식입니다. 이것은 잠재적 악성 문서를 격리하여, 공격 경로를 줄이는데 도움이 됩니다.

-- MDN web docs --
```

요약 : `Scheme`, `Host`, `Port` 이 3가지 중 하나가 같지 않으면 다른 출처로 본다.

<br/>

![CORS](https://mdn.mozillademos.org/files/17214/simple-req-updated.png)

HTTP 호출의 종류
---------------

<br/>

### Simple Request

 - 다음 중 하나의 메서드

    1. GET
    2. HEAD
    3. POST

 - Content-Type이 아래와 같을 경우
    1. application/x-www-form-urlencoded
    2. multipart/form-data
    3. text/plain

<br/><br/>

### Preflight Request

<br/>

```
프리플라이트(Preflight) 방식은 일반적으로 우리가 웹 어플리케이션을 개발할 때 가장 마주치는 시나리오이다. 이 시나리오에 해당하는 상황일 때 브라우저는 요청을 한번에 보내지 않고 예비 요청과 본 요청으로 나누어서 서버로 전송한다.

이때 브라우저가 본 요청을 보내기 전에 보내는 예비 요청을 Preflight라고 부르는 것이며, 이 예비 요청에는 HTTP 메소드 중 OPTIONS 메소드가 사용된다. 예비 요청의 역할은 본 요청을 보내기 전에 브라우저 스스로 이 요청을 보내는 것이 안전한지 확인하는 것이다.
```
<br/>

![preflight](https://evan-moon.github.io/static/c86699252752391939dc68f8f9a860bf/6af66/cors-preflight.png)

<br/>

```
우리가 자바스크립트의 fetch API를 사용하여 브라우저에게 리소스를 받아오라는 명령을 내리면 브라우저는 서버에게 예비 요청을 먼저 보내고, 서버는 이 예비 요청에 대한 응답으로 현재 자신이 어떤 것들을 허용하고, 어떤 것들을 금지하고 있는지에 대한 정보를 응답 헤더에 담아서 브라우저에게 다시 보내주게 된다.

이후 브라우저는 자신이 보낸 예비 요청과 서버가 응답에 담아준 허용 정책을 비교한 후, 이 요청을 보내는 것이 안전하다고 판단되면 같은 엔드포인트로 다시 본 요청을 보내게 된다. 이후 서버가 이 본 요청에 대한 응답을 하면 브라우저는 최종적으로 이 응답 데이터를 자바스크립트에게 넘겨준다.
```

<br/>

출처 : https://evan-moon.github.io/2020/05/21/about-cors/

<br/><br/>

## 해결 방법

<br/>

### 클라이언트 사이드

```
1. 웹 브라우저 실행시 외부 요청을 허용하는 옵션을 사용
아래에서 자세하게 설명하겠지만 same origin policy는 결국 클라이언트인 웹 브라우저가 요청을 해도 되는지 판단해서 결정하는 것으로 이 과정만 무시한다면 어디든 요청을 못할 이유는 없다. 크롬같은 웹 브라우저들은 실행시 커맨드라인 옵셥을 통해서 외부 도메인 요청가능 여부를 확인하는 동작을 무시하게 할 수 있다.

크롬의 경우: --disable-web-security 옵션을 추가하여 크롬 실행
```
[링크](https://haru.kafra.kr/68)
```
2. 외부 요청을 가능하게 해주는 플러그인 설치
이 부분도 아래에서 설명하겠지만 서버에서 받은 요청의 응답에 특정 header(Access-Control-Allow-Origin: *)만 추가하면 웹 브라우저가 요청이 가능한 사이트로 인식해서 요청이 가능하다. 크롬의 경우 웹스토어에 보면 크롬에서 발생하는 모든 http 요청을 가로채서 응답에 위 header를 추가해주는 플러그인이 있다. 웹스토어에서 cors로 검색하면 확장 프로그램 검색결과에서 찾을 수 있다. 
```
[링크](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)

```
3. JSONP방식으로 요청
웹 브라우저에서 css나 js 같은 리소스 파일들은 동일출처 정책에 영향을 받지 않고 로딩이 가능하다. 이런점을 응용해서 외부 서버에서 js 파일을 읽듯이 요청한 결과를 json으로 바꿔주는 일종의 편법적인 방법이다. 단점은 리소스 파일을 GET 메서드로 읽어오기 때문에 GET 방식으로 요청해야함
```
[링크](https://js2prince.tistory.com/entry/Ajax-JSONP%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-Cross-Domain-%ED%95%B4%EA%B2%B0)

<br/><br/>
### 서버 사이드

가장 쉬운 방법으로 모든 요청을 허용하는 방식이다.
```
1. preflight 요청을 받기 위해 OPTIONS 메서드의 요청을 받아서 컨트롤 해야 한다.
```

```
2. 모든 요청의 응답에 아래 header를 추가 한다.
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
Access-Control-Max-Age: 3600
Access-Control-Allow-Headers: Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization
```


**Request headers (클라이언트의 요청 Header)**
```
Origin: 요청을 보내는 페이지의 출처(도메인)
Access-Control-Request-Method: 실제 요청하려는 메서드
Access-Control-Request-Headers: 실제 요청에 포함되어 있는  해더 이름
```

**Response headers (서버에서의 응답 Header)**
```
Access-Control-Allow-Origin: 요청을 허용하는 출처. * 이면 모든곳에 공개되어 있음을 의미한다.
Access-Control-Allow-Credentials: 클라이언트 요청이 쿠키를 통해서 자격 증명을 해야 하는 경우에 true. true를 응답 받은 클라이언트는 실제요청시 서버에서 정의된 규격의 인증값이 담긴 쿠키를 같이 보내야 한다.
Access-Control-Expose-Headers: 클라이언트 요청에 포함되어도 되는 사용자 정의 해더.
Access-Control-Max-Age: 클라이언트에서 preflight 의 요청 결과를 저장할 기간을 지정. 클라이언트에서 preflight 요청의 결과를 저장하고 있을 시간이다. 해당 시간동안은 preflight요청을 다시 하지 않게 된다.
Access-Control-Allow-Methods: 요청을 허용하는 메서드. 기본값은 GET,POST 라고 보면된다. 이 해더가 없으면 GET과 POST요청만 가능하다. 만약 이해더가 지정이 되어 있으면, 클라이언트에서는 해더 값에 해당하는 메서드일 경우에만 실제 요청을 시도하게 된다.
Access-Control-Allow-Headers: 요청을 허용하는 해더. 
```

[링크](https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/how-to-cors.html)


출처: https://mosei.tistory.com/entry/JSONP와-CORSCrossOrigin-Resource-Sharing-크로스도메인-사용