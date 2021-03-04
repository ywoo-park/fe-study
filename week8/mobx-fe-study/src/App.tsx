import React from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';

import store from './store';

const App: React.FC = observer(() => {
  const { countClass, countObject, doubleClass } = store;
  autorun(() => {
    if (doubleClass.double) {
      console.log('Double' + doubleClass.double);
    }
    if (doubleClass.double === 8) {
      console.log('만약 value가 8이라면 0으로 초기화');
      doubleClass.value = 0;
    }
  });

  return (
    <div style={{ padding: '50px' }}>
      <div style={{ marginBottom: '50px' }}>
        <h1>Count (Store 1)</h1>
        <div>number: {countClass.number}</div>
        <button onClick={() => countClass.increase()}>plus</button>
        <button onClick={() => countClass.decrease()}>minus</button>
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h1>Count (Store 2)</h1>
        <div>num: {countObject.num}</div>
        <button onClick={() => countObject.increase()}>increment</button>
      </div>

      <div>
        <h1>Count Double (Store 3)</h1>
        <div>double number: {doubleClass.double}</div>
        <button onClick={() => doubleClass.increment()}>
          double increment
        </button>
      </div>
    </div>
  );
});

export default App;