## Recoil

### 등장 배경

- 복잡한 React Application 내에서 상태 관리를 위해 Redux, MobX와 같은 라이브러리가 사용되어 왔다.
- Redux, MobX 등의 상태 관리 라이브러리
  - API가 단순하지 않았고,  근본적으로 React에서 사용하기 위해서 개발된 것이 아니었다.
  - store 구성을 위해 많은 보일러 플레이트와 장황한 코드를 작성해야 한다.
  - 비동기 데이터 처리 또는 계산된 값 캐시와 같은 중요한 기능은 라이브러리 자체의 기능이 아니며, 이를 해결하기 위해 또 다른 라이브러리(ex. Redux Saga)를 사용해야 한다.

- Context API
  - locale/theme와 같은 낮은 빈도의 업데이트에 사용에는 적합하지만,  Context API는 데이터 서브셋을 대상으로 변경을 감지하고 업데이트할 수 없다.
  - 따라서, Provider의 값이 배열이나 객체인 경우 구조가 조금이라도 변경된다면 그 Context를 구독하고 있는 하위의 모든 것이 다시 렌더링 되는 비효율이 발생한다.

- **API and Sementics and behavior as Reactish as possible**

### 특징

- Recoil은 Data-flow graph(directed graph)의 형태로 React Tree 구조에 결합하면서 상태를 관리한다.
- **Atoms라고 부르는 그래프의 roots로부터 순수한 함수(pure function)을 통해 state 변경이 일어난다.**

### 장점

- React local state 관리(hooks) interface 처럼 get/set interface 기반의 boilerplate-free API로 구성 되어있다.
- Concurrent(동시성) Mode와 같은 React의 새로운 기능에 대한 결합이 지속적으로 이루어진다.

### 핵심 구성 요소

#### Atom

- **상태의 단위 **(컴포넌트가 구독할 수 있는 React state)
- **업데이트가 가능하고 구독이 가능하다.** 
- Atom의 값을 변경하면 그것을 구독하고 있는 컴포넌트들이 모두 다시 렌더링된다.
- 런타임 환경에서 생성될 수가 있다. 
- Atom은 React의 지역 컴포넌트 상태에서 사용된다. 
- 만약 같은 Atom이 여러 컴포넌트에 사용되면, 그 모든 컴포넌트들은 그 상태를 공유한다.

```typescript
export const nameState = atom({
  key: 'nameState',
  default: 'Jane Doe'  // 정적인 값, 함수 또는 심지어 비동기 함수(이후 지원 예정)가 될 수 있다.
});
```

#### RecoilRoot

```typescript
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```

#### useRecoilState

- atom의 값을 구독하여 업데이트할 수 있는 hook. 
- useState와 동일한 방식으로 사용할 수 있다.

#### useRecoilValue

- setter 함수 없이 atom의 값을 반환만 한다.

#### useSetRecoilState

- setter 함수만 반환한다.

```typescript
import {nameState} from './someplace'

// useRecoilState
const NameInput = () => {
  const [name, setName] = useRecoilState(nameState);
  const onChange = (event) => {
   setName(event.target.value);
  };
  return <>
   <input type="text" value={name} onChange={onChange} />
   <div>Name: {name}</div>
  </>;
}

// useRecoilValue
const SomeOtherComponentWithName = () => {
  const name = useRecoilValue(nameState);
  return <div>{name}</div>;
}

// useSetRecoilState  
const SomeOtherComponentThatSetsName = () => {
  const setName = useSetRecoilState(nameState);
  return <button onClick={() => setName('Jon Doe')}>Set Name</button>;
}
```

#### selector

- seletor는 상태에서 파생된 데이터로, 다른 atom에 의존하는 동적인 데이터를 만들 수 있게 해준다. 
- **상위 atom이나 selector가 업데이트 되면 selector 함수는 다시 계산 될 것이다.** 
- 컴포넌트들은 아톰처럼 선택자를 구독할 수 있으며, selector가 변화하면 리렌더링이 일어난다.
- selector는 상태에 기반하여 파생된 데이터를 계산할 때 사용된다.
- get 프로퍼티
  - 계산이 되어야 하는 함수이다. 
  - 아톰과 다른 선택자에 접근할 수 있는데 get의 매개변수(argument)로 넘겨서 할 수 있다. 
  - 다른 아톰이나 선택자에 접근할 때 마다 의존성 관계가 만들어져서 다른 아톰을 업데이트하거나 선택자가 다시 계산이 되기도 한다. 
- 선택자는 useRecoilValue()를 가지고 읽혀질 수 있다. 
- 이 메서드는 아톰과 선택자를 매개변수로 받아서 상응하는 값을 반환한다.

```typescript
// 동물 목록 상태
const animalsState = atom({
  key: 'animalsState',
  default: [{
    name: 'Rexy',
    type: 'Dog'
  }, {
    name: 'Oscar',
    type: 'Cat'
  }],
});
// 필터링 동물 상태
const animalFilterState = atom({
 key: 'animalFilterState',
 default: 'dog',
});
// 파생된 동물 필터링 목록
const filteredAnimalsState = selector({
 key: 'animalListState',
 get: ({get}) => {
   const filter = get(animalFilterState);
   const animals = get(animalsState);
   
   return animals.filter(animal => animal.type === filter);
 }
});
// 필터링된 동물 목록을 사용하는 컴포넌트
const Animals = () => {
  const animals = useRecoilValue(filteredAnimalsState);
  return animals.map(animal => (<div>{ animal.name }, { animal.type    }</div>));
}
```

#### 비동기 데이터 쿼리

- Recoil은 Data-flow graph를 통해 상태와 React 컴포넌트를 연결해 준다.
- 이 그래프에서 함수는 비동기적이다.
- 동기적인 React 렌더링 함수에서 비동기적인 함수를 잘 사용할 수 있게 도와준다.

- 간단하게 Promise 형태의 리턴값을 selector가 갖게하면 비동기 데이터 쿼리를 사용할수 있다.

- 동기적 데이터 쿼리

  ```typescript
  const currentUserIDState = atom({
    key: 'CurrentUserID',
    default: 1,
  });
  
  const currentUserNameState = selector({
    key: 'CurrentUserName',
    get: ({get}) => {
      return tableOfUsers[get(currentUserIDState)].name;
    },
  });
  
  function CurrentUserInfo() {
    const userName = useRecoilValue(currentUserNameState);
    return <div>{userName}</div>;
  }
  
  function MyApp() {
    return (
      <RecoilRoot>
        <CurrentUserInfo />
      </RecoilRoot>
    );
  }
  ```

- 비동기적 데이터 쿼리

  ```typescript
  const currentUserNameQuery = selector({
    key: 'CurrentUserName',
    get: async ({get}) => {
      const response = await myDBQuery({
        userID: get(currentUserIDState),
      });
      return response.name;
    },
  });
  
  function CurrentUserInfo() {
    const userName = useRecoilValue(currentUserNameQuery);
    return <div>{userName}</div>;
  }
  ```

  ```typescript
  function MyApp() {
    return (
      <RecoilRoot>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </RecoilRoot>
    );
  }
  ```

  - Promise를 반환하거나 async 함수를 사용하면 비동기적으로 데이터를 쿼리 할수 있다.

  - 만약 dependency에 변화가 생긴다면, selector는 re-evaluated 될 것이고, 새로운 쿼리를 실행 할 것이다.

  - 쿼리의 결과는 캐싱되므로, 쿼리는 unique한 입력에 따라서 한번만 실행된다.

  - 동기적 쿼리와 비동기적 쿼리의 interface는 동일하기 때문에, atom state이든 파생된 selector state이든, 비동기적 쿼리이든 구현방식은 동일하다. 

  - Recoil 비동기 처리 과정에서 주의할점

    - React 렌더링 함수는 동기적으로 실행되기 때문에, 비동기 처리의 promise가 resolve되기 전에 컴포넌트가 렌더링되는 문제 상황이 발생가능

    - 해결책

      - Recoil은 React Suspense를 함께 사용하도록 설계됨

      - 렌더링될 컴포넌트를 React.Suspense로 감싸면, pending data에 대해서 감지하고 이를 주입한 fallback UI로 대체가 가능하다.

        ```typescript
        function MyApp() {
          return (
            <RecoilRoot>
              <React.Suspense fallback={<div>Loading...</div>}>
                <CurrentUserInfo />
              </React.Suspense>
            </RecoilRoot>
          );
        }
        ```

        

