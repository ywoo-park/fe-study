# GraphQL

Graph QL(이하 gql)은 Structed Query Language(이하 sql)와 마찬가지로 쿼리 언어입니다. gql은 웹 클라이언트가 데이터를 서버로 부터 효율적으로 가져오는 것이 목적입니다.

gql은 단 하나의 Endpoint가 존재 합니다. 또한, gql API에서는 불러오는 데이터의 종류를 쿼리 조합을 통해서 결정 합니다. gql API는 gql 스키마의 타입마다 데이터베이스 SQL 쿼리가 달라집니다.

GraphQL은 API를 위한 쿼리 언어이며 이미 존재하는 데이터로 쿼리를 수행하기 위한 런타임 입니다. GraphQL은 API에 있는 데이터에 대한 완벽하고 이해하기 쉬운 설명을 제공하고 클라이언트에게 필요한 것을 정확하게 요청할 수 있는 기능을 제공하며 시간이 지남에 따라 API를 쉽게 진화시키고 강력한 개발자 도구를 지원합니다.

## GraphQL 과 RESTful 의 차이점
GraphQL 을 통한 API 는 RESTful API 와는 다른 측면을 보인다.
GraphQL API 는 주로 하나의 Endpoint 를 사용한다.
GraphQL API 는 요청할 때 사용한 Query 문에 따라 응답의 구조가 달라진다.
하나하나 살펴보자.

### API 의 Endpoint
위에서 말했듯 RESTful API 는 Resource 마다 하나의 Endpoint 를 가지고,
그 Endpoint 에서 그 Resource 에 대한 (거의) 모든 것을 담당한다.
반면, GraphQL 은 전체 API 를 위해서 단 하나의 Endpoint 만을 사용한다.
각각 v3 root endpoint 와 v4 root endpoint 로 Endpoint 를 제공하지만,
v4 의 경우 Root endpoint 를 제외한 어떤 Endpoint 도 없는 반면,
v3 의 경우는 각 Resource 마다 수많은 Endpoint 들을 제공한다.

## GraphQL vs RESTful
이런 차이로 인해 생기는 장단점은 무엇이 있는가?

GraphQL 은 다음과 같은 장점을 가진다.

HTTP 요청의 횟수를 줄일 수 있다.
RESTful 은 각 Resource 종류 별로 요청을 해야하고, 따라서 요청 횟수가 필요한 Resource 의 종류에 비례한다.
반면 GraphQL 은 원하는 정보를 하나의 Query 에 모두 담아 요청하는 것이 가능하다.
HTTP 응답의 Size 를 줄일 수 있다.
RESTful 은 응답의 형태가 정해져있고, 따라서 필요한 정보만 부분적으로 요청하는 것이 힘들다.
반면 GraphQL 은 원하는 대로 정보를 요청하는 것이 가능하다.
두 장점을 예시를 통해 알아보자.
우리가 글의 목록과 각 글에 쓰인 댓글의 목록을 가져올 수 있는 API 가 있다고 해보자.
이 API 가 RESTful 하게 작성되었다면 글과 댓글의 목록을 가져오기 위해서 다음 중 한 가지 방법을 선택해야 할 것이다.

글의 목록을 가져오는 Endpoint 와 댓글의 목록을 가져오는 Endpoint 에 각각 요청을 여러 번 한다.
글이 5 개 있다고 해보자.
이 경우에는 글의 목록을 가져오는 Endpoint 에 요청을 하고,
각 글마다 댓글의 목록을 가져오는 Endpoint 에 요청을 5 번 해야 글과 댓글의 목록을 모두 가져올 수 있을 것이다. (1. 장점)
글의 목록을 가져오는 Endpoint 의 응답에 댓글의 목록을 포함한다.
글이 5 개 있다고 해보자.
이 경우에는 글의 목록을 가져오는 Endpoint 에 요청을 1 번 하면 끝이지만,
글의 목록만 가져와야 하는 경우나 몇몇 글의 댓글만 가져와야 하는 경우가 있다면
필요한 정보에 비해서 응답의 크기가 쓸데없이 큰 경우가 발생할 것이다. (2. 장점)
글의 목록을 가져오는 요청에 조건을 달아서 댓글의 목록을 포함할 수도, 포함하지 않을 수도 있게 한다.
API 에 Endpoint 가 많을 경우, API 를 만드는 것이 점점 더 복잡해지고,
결국 Facebook 에서 GraphQL 을 만든 이유와 비슷한 상황에 처하게 된다.
반면 같은 API 를 GraphQL 로 작성하였다면

글의 목록만을 가져와야 할 경우에는 글의 목록만을 가져오는 Query 를 작성하여 서버에 요청을 보낸다.
글의 목록과 댓글을 모두 가져와야 할 경우에는 글의 목록과 댓글을 모두 가져오는 Query 를 작성하여 서버에 요청을 보낸다.
등을 할 수 있다.

그렇다면 GraphQL 은 장점만 가지는가? 물론 단점도 있다.
GraphQL 은 다음과 같은 단점을 가진다.

File 전송 등 Text 만으로 하기 힘든 내용들을 처리하기 복잡하다.
고정된 요청과 응답만 필요할 경우에는 Query 로 인해 요청의 크기가 RESTful API 의 경우보다 더 커진다.
재귀적인 Query 가 불가능하다. (결과에 따라 응답의 깊이가 얼마든지 깊어질 수 있는 API 를 만들 수 없다.)
물론 GraphQL 에서 File 전송을 할 수 없는 것은 아니나,
일반적인 GraphQL API 에 비해서 복잡해지거나 외부의 Service 에 의존해야하는 등 문제가 발생한다.

## GraphQL or RESTful?
그렇다면 GraphQL 과 RESTful 중 어떤 것을 선택해서 사용해야하는가?
다음과 같은 기준으로 선택하면 될 것이다.

### GraphQL
서로 다른 모양의 다양한 요청들에 대해 응답할 수 있어야 할 때
대부분의 요청이 CRUD(Create-Read-Update-Delete) 에 해당할 때
### RESTful
HTTP 와 HTTPs 에 의한 Caching 을 잘 사용하고 싶을 때
File 전송 등 단순한 Text 로 처리되지 않는 요청들이 있을 때
요청의 구조가 정해져 있을 때

출처 : https://www.holaxprogramming.com/2018/01/20/graphql-vs-restful-api/

![GQ1](http://tech.kakao.com/files/graphql-stack.png)

![GQ2](http://tech.kakao.com/files/graphql-mobile-api.png)

### GraphQL의 강점

1. 필요한 정보만 선택하여 가져올 수 있음
    - Overfetching 문제 해결
    - 데이터 전송량 감소

2. 여러 계층의 정보들을 한 번에 받아올 수 있음
    - Underfetcing 문제 해결
    - 요청 횟수 감소

``` 쿼리 예시

query {
  teams {
    manager
    office
  }
}

query {
  team(id: 1) {
    manager
    office
  }
}

query {
  team(id: 1) {
    manager
    office
    members {
      first_name
      last_name
    }
  }
}

mutation {
  postTeam (input: {
    manager: "John Smith"
    office: "104B"
    extension_number: "#9982"
    mascot: "Dragon"
    cleaning_duty: "Monday"
    project: "Lordaeron"
  }) {
    manager
    office
    extension_number
    mascot
    cleaning_duty
    project
  }
}

```

[GraphQL을 사용하는 라이브러리](https://graphql.org/code/)

<br/>
<br/>

## Apollo GraphQL 

 - 백엔드/프론트엔드 동시 사용
 - 간편하고 쉬운 설정
 - 많은 기능 제공

Server -> Apollo Server
Client -> Apollo Client

[링크](https://www.apollographql.com/)

### GraphQL Server 주요 인자
<br/>


``` Code
Type

반환될 데이터의 형태를 지정
자료형을 가진 필드들로 구성

Resolver

Query란 object의 항목들로 데이터를 반환하는 함수 선언
실제 프로젝트에서는 MySQL 조회 코드 등..

```

### 쿼리/뮤테이션(query/mutation)
<br/>

```
쿼리와 뮤테이션 그리고 응답 내용의 구조는 상당히 직관적 입니다. 요청하는 쿼리문의 구조와 응답 내용의 구조는 거의 일치 합니다.

gql에서는 굳이 쿼리와 뮤테이션을 나누는데 내부적으로 들어가면 사실상 이 둘은 별 차이가 없습니다. 쿼리는 데이터를 읽는데(R) 사용하고, 뮤테이션은 데이터를 변조(CUD) 하는데 사용한다는 개념 적인 규약을 정해 놓은 것 뿐입니다.
```

### 리졸버(resolver)
<br/>

``` 
대부분의 gql 라이브러리에서 처리를 하지만, gql에서 데이터를 가져오는 구체적인 과정은 resolver(이하 리졸버)가 담당하고, 이를 직접 구현 해야 합니다. 프로그래머는 리졸버를 직접 구현해야하는 부담은 있지만, 이를 통해서 데이터 source의 종류에 상관 없이 구현이 가능 합니다.
```


#### GraphQL Client

[GQ Client 문서](https://www.apollographql.com/docs/react/get-started/)

```

App.js
---
NavMenus 
menu값에 따라 상단 App-header의 버튼을 표시하는 함수
mainComp
App-header 아래 메인 화면에 나타날 컴포넌트 매핑

roles.js, teams.js, people.js
---
AsideItems	메인화면 왼쪽의 사이드 섹션	
MainContents	메인화면	리스트
```

### 실행 

```
새 터미널 실행
cd 1-3-graphql-exp
npm start

새 터미널 실행
cd 4-1-react-before-apollo
npm start
```


출처 
- https://tech.kakao.com/2019/08/01/graphql-basic/
- https://www.yalco.kr/