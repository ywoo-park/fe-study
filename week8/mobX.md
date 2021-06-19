# MobX6

### Redux

--------------------

![Redux](https://miro.medium.com/max/616/1*ecPyts0f-9FI67b1VAYKVQ.jpeg)

[React 개발자의 숙명](https://repo.yona.io/doortts/blog/post/297)

```
리덕스의 개념을 설명하는데 Data Flow Diagram이 자주 등장 합니다. Action, Reducer, Dispatcher, Store, View 이런 개념들은 사실 State를 렌더링 하고 변경하기 위한 어떤 메소드 즉 서비스 같은 것을 가져다 그냥 사용하는 것 뿐인 데 개념을 장황하게 설명합니다. 그리고 그것들이 상호 작용하기 위해서 추가 해주는 보일러플레이트 코들이 매 Component마다 추가 해주어야합니다. 컴포넌트와 리덕스를 연결하기위해서 mapStateToProps, mapDispatchToProps 함수를 사용하고 Action을 정의 하고.. 등등 Javascript의 높은 문법 자유도 때문에 예제 코드들의 선언 방식 또한 자유 분방합니다. 바로 이런 것들이 React가 다소 어렵다라는 인식을 주게되는 하나의 요인 같댜는 생각이 개인적으로 들기도 합니다.  

출처 : 우아한 형제 블로그
```


### MobX

--------------------

![플로우](https://mobx.js.org/assets/action-state-view.png)
![플로우2](https://miro.medium.com/max/4800/1*KDHj59z4GkJR69ikAvMIvg.jpeg)

- state : 어플리케이션의 데이터 상태 (데이터)

- derivations : 파생값이라고 한다. 어플리케이션으로부터 자동으로 계산되는 모든 값을 뜻하게 된다. (뷰)

- Reaction : 파생값과 비슷하지만 값을 생성하지 않는 함수  
I/O(input, output)과 연관된 작업들을 수행   
reaction은 적당할 때에 자동으로 DOM을 업데이트 하게 해주고 네트워크 요청을 하도록 해준다.

- Action : action은 state를 변경하는 모든 것을 말한다

1. Derived는 observable 값이 변경됨에 따라 자동으로 업데이트-> 결과적으로 중간 값을 관찰 불가.

2. Derived는 동기적 갱신됨 -> 작업이 변경된 후 계산된 값을 확인 가능

3. 사용되지 않는 계산 된 값은 필요할 때까지 업데이트되지 않음(ex.I/O) 

4. 뷰가 더 이상 사용되지 않으면 자동으로 가비지 처리

5. 모든 계산 된 값 은 순수해야 함


### 기본 용어

- **observable** : 추적 가능한 state 정의
- **action** : state를 변경하는 메소드
- **computed** : state와 캐시로부터 새로운 결과를 반환


1. observable

```
observable은 makeObservable, makeAutoObservable 그리고 observable 이 세 가지가 있으며, 모두 추적 가능한 상태의 state로 만들어준다.

makeObservable은 주로 class의 this와 많이 사용된다.

makeAutoObservable은 makeObservable와 거의 비슷하지만, class에서 super나 subclassed가 있을 경우 사용할 수 없다.

```


> make(Auto)Observable와 observable의 가장 큰 차이점은 전자는 들어온 인자로 들어온 object를 바로 변경하지만, 후자는 클론을 하고 observable하게 만든다는 점이다. 또한 observable는 Proxy object를 생성한다. 따라서 공식 문서에서도 make(Auto)Observable 사용을 권장하고 있다.




2. action

```
action은 state를 변경하는 것을 뜻한다. makeObservable을 사용하면 action을 따로 작성해줘야 하지만, makeAutoObservable은 이를 대신해준다. 밑에 코드에서 두 가지 방식 모두 사용해 볼 것이다.
```

3. computed

```
computed values(계산된 값)는 다른 observable들에서 어떠한 정보를 도출하는데 사용할 수 있다. 
```

## Store

- Stores는 비즈니스 로직과 state를 컴포넌트에서 빼서 단독으로 프론트, 백에서 모두 사용할 수 있도록 만드는 것

- MobX에서 규정하는 Store에는 Domain Stores(그 안에 Domain objects)와 UI Stores가 있음

- 하나의 Domain Store는 해당 애플리케이션에서 하나의 역할을 책임지고 수행해야 한다. 

- 하나의 스토어 안에는 여러개의 domain objects가 있을 수 있다. 그리고 domain objects안에서 간단하게 state를 모델링할 수 있다.


## 프로젝트 세팅  

```
$ yarn create react-app mobx-playground --template typescript
$ cd mobx-playground
```

## 장점

 - Spring Framework 와 유사한 아키텍쳐 사용 가능

![Mobx - Spring](https://woowabros.github.io/img/2019-01-02/mobx-spring-layer.png)

![Mobx - Redux](https://woowabros.github.io/img/2019-01-02/mobx-redux-layer.png)

 > 우아한 형제 어드민 예시  
 ![Atomic Design](https://woowabros.github.io/img/2019-01-02/atomic-design.png)
 ![Architecture](https://woowabros.github.io/img/2019-01-02/atomic-design-folder.png)




출처 :   
[mobx 공식홈페이지](https://mobx.js.org/)  
[mobx 처음 시작해보기](https://medium.com/@jsh901220/mobx-%EC%B2%98%EC%9D%8C-%EC%8B%9C%EC%9E%91%ED%95%B4%EB%B3%B4%EA%B8%B0-a768f4aaa73e)  
[mobx 우아한 형제들](https://woowabros.github.io/experience/2019/01/02/kimcj-react-mobx.html)