## Flux Pattern

> 페이스북에서 만든 클라이언트의 상태관리를 위한 아키텍쳐



![varying transports between each step of the Flux data flow](https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-explained-1300w.png)

대부분의 상태관리 라이브러리가 사용하고 있는 아키텍쳐.



### 단방향 흐름 아키텍쳐

action -> dispatch -> store -> view 으로 이어지는 단방향 아키텍쳐.

2-way binding은 cascading update 문제를 발생시킬 수 있다. 이는 인터랙션에 따른 변화를 예측하기 어렵게 한다. 

따라서 단방향 흐름을 통해 상태변화를 예측하기 용이하도록 설계됨.



### Dispatcher

action을 store로 전달해주는 역할을 한다.

store간 의존성 관리를 위해 필요하다.

콜백을 통해 action을 store에 전달해줌으로써 이를 관리할 수 있다.

store A가 store B보다 먼저 갱신되어야만 하는 경우 dispatcher의 waitFor 메소드를 통해 이를 해결할 수 있다.

```jsx
/**
   * @param  {array} promisesIndexes
   * @param  {function} callback
   */
  waitFor: function(promiseIndexes, callback) {
    var selectedPromises = promiseIndexes.map(function(index) {
      return _promises[index];
    });
    return Promise.all(selectedPromises).then(callback);
  }
```





### Store

state와 reducer logic을 관리.

state를 반환하는 ``getState() `` 메소드를 내장하고 있음.

action type과 data에 따라 reducer 함수를 호출해 새로운 state를 반환하고, 
state 변경시 change event를 emit하여 view에 알려준다.

이 때 reducer는 순수함수여야 한다. (테스트나 상태 history를 추적하기 용이하기 위해)


### View

store의 event를 구독하고 있으면서 event가 발생하면 render() 메소드를 다시 호출하여 리렌더링을 진행.



### Reference

* https://facebook.github.io/flux/docs/in-depth-overview/