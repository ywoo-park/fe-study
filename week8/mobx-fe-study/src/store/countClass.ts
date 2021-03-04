
import { action, makeObservable, observable } from 'mobx';

class Count {
  number: number = 0;

  constructor() {
    makeObservable(this, {
      number: observable,
      increase: action,
      decrease: action,
    });
  }

  increase = () => {
    this.number++;
  };
  decrease = () => {
    this.number--;
  };
}

const countClass = new Count();
export default countClass;