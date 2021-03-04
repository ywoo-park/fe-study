import { observable } from 'mobx';

const countObject = observable({
  num: 0,
  increase() {
    this.num++;
  },

  decrease() {
    this.num--;
  },
});

export default countObject;