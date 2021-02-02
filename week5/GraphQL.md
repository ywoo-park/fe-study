# GraphQL

Graph QL(이하 gql)은 Structed Query Language(이하 sql)와 마찬가지로 쿼리 언어입니다. gql은 웹 클라이언트가 데이터를 서버로 부터 효율적으로 가져오는 것이 목적입니다.

gql은 단 하나의 Endpoint가 존재 합니다. 또한, gql API에서는 불러오는 데이터의 종류를 쿼리 조합을 통해서 결정 합니다. gql API는 gql 스키마의 타입마다 데이터베이스 SQL 쿼리가 달라집니다.

GraphQL은 API를 위한 쿼리 언어이며 이미 존재하는 데이터로 쿼리를 수행하기 위한 런타임 입니다. GraphQL은 API에 있는 데이터에 대한 완벽하고 이해하기 쉬운 설명을 제공하고 클라이언트에게 필요한 것을 정확하게 요청할 수 있는 기능을 제공하며 시간이 지남에 따라 API를 쉽게 진화시키고 강력한 개발자 도구를 지원합니다.

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