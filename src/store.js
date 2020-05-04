import { createStore, applyMiddleware } from 'redux';
import modules from './modules';
//import loggerMiddleware from './lib/loggerMiddleware';

import { createLogger } from 'redux-logger';
// import ReduxThunk from 'redux-thunk';

// import promiseMiddleware from 'redux-promise-middleware';

import penderMiddleware from 'redux-pender';

/* 로그 미들웨어를 만들 때 설정을 커스터마이징 할 수 있다.
  https://github.com/evgenyrodionov/redux-logger#options
*/

const logger = createLogger();
// const pm = promiseMiddleware({
//   promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']
// });

// 미들웨어가 여러 개일 때는 파라미터로 전달하면 됨. 예: applyMiddleware(a,b,c)
// 미들웨어 순서는 여기에서 전달한 파라미터 순서대로 지정한다.
const store = createStore(modules, applyMiddleware(logger, penderMiddleware()))

export default store;