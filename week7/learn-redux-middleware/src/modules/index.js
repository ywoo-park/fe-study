import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter from './counter';
import posts from './posts';

const rootReducer = combineReducers({ counter, posts });

// export function* rootSaga() {
//     yield all([counterSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
// }

export default rootReducer;
