### Redux란?
'action'이라는 이벤트를 기반으로  애플리케이션의 상태를 관리하고 업데이트 해주는 라이브러리. 

### 왜 써야 하는가?

- 어플리케이션의 여러 부분에 필요한 global state를 관리하게 해준다.
- 변화가 일어났을 때 어플리케이션이 업데이트되는 로직을 쉽게 해준다.
- 예측가능하고 테스트가능한 코드를 짜게 해준다.

### 언제 써야 하는가?

다음과 같은 경우에 쓰면 좋다.

- 어플리케이션의 다양한 부분에 쓰이는 대규모의 상태관리가 필요할 때
- 어플리케이션 상태가 자주 바뀔 때
- 상태 업데이트 로직이 복잡할 때
- 어플리케이션 코드 규모가 크고, 많은 사람들이 참여할 때

### redux vs context API
**context API**
- 3rd party library가 필요없어 bundle을 조금이나마 줄일 수 있다.
- 코드가 상대적으로 간결
- 잦은 업데이트 따른 최적화가 어렵다. (상태 변경에 따른 모든 컴포넌트를 리렌더링)

**redux**
- 부가적인 라이브러리가 필요하다.
- 코드가 길어진다.
- 잦은 업데이트에 최적화되어 있다. (업데이트된 컴포넌트만 리렌더링)
- 디버깅, 테스트가 용이

관리해야 하는 상태규모가 작고, 빠른 개발을 필요로 하며, 업데이트가 많지 않은 경우에는 context API를 사용.

업데이트가 많이 되고 관리해야 하는 상태규모가 큰 경우에는 redux를 사용.

### Redux 라이브러리와 툴들

**react-redux**

React 컴포넌트가 Redux store와 상호작용하기 편리하게 나온 패키지

**redux-toolkit**

redux  작업을 단순화해주고 best-pracitce를 제공해주어 redux를 쉽게 쓸수 있게 하는 패키지

**redux-devTools-extension**

"time-travel debugging" redux store 값의 변화를 추적할 수 있는 extension

**redux-thunk**

비동기 작업을 처리할 때 사용하는 미들웨어. 
action 객체가 아닌 함수를 dispatch하여 actino을 reducer로 넘기기 이전에 비동기 작업을 실행할 수 있다.

**redux-saga**

redux-thunk 다음으로 가장 많이 사용되는 라이브러리.
특정 action이 발생하면 특정 작업을 처리할 수 있음 
1. 기존 요청 취소
2. API 요청 실패 재요청
3. 다른 액션을 dispatch
4. 자바스크립트 코드를 실행
5. 웹소켓




### Reference
* https://redux.js.org/tutorials/essentials/part-1-overview-concepts
* https://react.vlpt.us/redux/
* https://academind.com/tutorials/reactjs-redux-vs-context-api/
* https://www.codehousegroup.com/insight-and-inspiration/tech-stream/using-redux-and-context-api#:~:text=Context%20API%20is%20easy%20to,creating%20unnecessary%20work%20and%20complexity.
