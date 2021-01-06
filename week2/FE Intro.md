## FE Intro

#### 1. 인터넷 기초

- 브라우저
  - 웹 서버에서 이동하며 쌍방향으로 통신하고 HTML 문서나 파일을 출력하는 그래픽 사용자 인터페이스 기반의 응용 소프트웨어.
  - 웹 브라우저는 대표적인 **HTTP 사용자 에이전트**의 하나이기도 하다.
- HTTP
  - 하이퍼텍스트 전송 프로토콜(HTTP)은 HTML과 같은 하이퍼미디어 문서를 전송하기위한 애플리케이션 레이어 프로토콜이다.
  - HTTP는 클라이언트가 요청을 생성하기 위한 연결을 연다음 응답을 받을때 까지 대기하는 전통적인 클라이언트-서버 모델을 따른다.
  - HTTP는 무상태 프로토콜이며, 이는 서버가 두 요청간에 어떠한 데이터(상태)도 유지하지 않음을 의미한다.
  - 일반적으로 안정적인 전송 레이어로 UDP와 달리 메세지를 잃지 않는 프로토콜인 TCP/IP 레이어를 기반으로 사용한다.
- DNS 동작 원리
  - 도메인 네임 시스템 (Domain Name System, DNS) 
    - 호스트의 도메인네임 (www.example.com)을 네트워크주소(192.168.1.0)로 변환하거나, 그 반대의 역할을 수행하는 시스템이다.
  
  - 동작 원리
  
  <img src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile1.uf.tistory.com%2Fimage%2F99E3EE4F5C0FE49F1736F8" style="zoom:50%;" />

#### 2. HTML/CSS/JavaScript

#### 3. 웹 보안

- HTTPS

  - HTTPS(HyperText Transfer Protocol over Secure Socket Layer, HTTP over TLS )는 HTTP의 보안이 강화된 버전이다.
  - HTTPS는 소켓 통신에서 일반 텍스트를 이용하는 대신에, SSL 이나 TLS프로토콜을 통해 세션 데이터를 암호화한다. 따라서 데이터의 적절한 보호를 보장한다.

- CORS

  - 교차 출처 리소스 공유(Cross-origin resource sharing, CORS)
  - 웹 페이지 상의 제한된 리소스를 최초 자원이 서비스된 도메인 밖의 다른 도메인으로 부터 요청할 수 있게 허용하는 구조

  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flowchart_showing_Simple_and_Preflight_XHR.svg/768px-Flowchart_showing_Simple_and_Preflight_XHR.svg.png" style="zoom:70%;" />

  

  - CORS는 교차 출처 요청을 허용하는 것이 안전한지 아닌지를 판별하기 위해 브라우저와 서버가 상호 통신하는 하나의 방법을 정의한다.
  - 순수하게 동일한 출처 요청보다 더 많은 자유와 기능을 허용하지만 단순히 모든 교차 출처 요청을 허용하는 것보다 더 안전하다.

#### 4. 웹 Framework

- React.js
  - 웹 페이지의 컴포넌트를 렌더링하고 빌드하는데 초점을 둔 Javascript 라이브러리
  - Angular와 달리, React.js는 페이지를 구성할 컴포넌트를 만들 수 있는 툴들로 구성되어 있다.
- Angular.js
  - 서버에 HTML 페이지들을 재로딩하길 요구하기보단, 웹사이트가 빠르고 효율적으로 렌더링 한다.
  - 라우팅, 상태 관리, 그리고 form 유효성과 같은 툴을 내재한 all-in-one 프레임워크
- Vue.js
  - 기능과 패키지가 비교적 적지만 Angular 처럼 모든 요소를 포함한 프레임워크

#### 5. 모듈 번들러

- Webpack
  - 의존 관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링하는 모듈 번들러이다.
  - Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요없다 
  - 다수의 자바스크립트 파일을 하나의 파일로 번들링하므로 html 파일에서 script 태그로 다수의 자바스크립트 파일을 로드해야 하는 번거로움도 사라진다.

#### 6. Modern CSS

- Styled Components
- CSS Modules
- Styled JSX

#### 7. Type 검사

- Typescript
  - 컴파일 언어, 정적 타입 언어이다. 
  - JS는 인터프리터 언어지만, TypeScript는 컴파일 언어로 코드 수준에서 미리 타입을 체크하여 오류를 체크해낸다. 

#### 8. SSR

- Server Side Rendering(SSR)

  - SSR은 서버에서 사용자에게 보여줄 페이지를 모두 구성하여 사용자에게 페이지를 보여주는 방식이다. JSP/Servlet의 아키텍처에서 이 방식을 사용했다.
  - SSR을 사용하면 모든 데이터가 매핑된 서비스 페이지를 클라이언트(브라우저)에게 바로 보여줄 수 있다. 
  - 서버를 이용해서 페이지를 구성하기 때문에 클라이언트에서 구성하는 CSR(client-side rendering)보다 페이지를 구성하는 속도는 늦어지지만 전체적으로 사용자에게 보여주는 콘텐츠 구성이 완료되는 시점은 빨라진다는 장점이 있다.

  <img src="https://d2.naver.com/content/images/2020/06/ssr.png" style="zoom:20%;" />

  

#### 9. Progressive Web App

#### 10. 상태 관리 라이브러리