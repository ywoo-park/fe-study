import { makeObservable, observable, computed, action } from 'mobx';

class Doubler {
  value;

  constructor(value: number) {
    makeObservable(this, {
      value: observable,
      double: computed,
      increment: action,
    });
    this.value = value;
  }

  get double() {
    return this.value * 2;
  }

  increment() {
    this.value++;
  }
}

const doubleClass = new Doubler(1);
export default doubleClass;