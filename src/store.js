import { createStore, combineReducers } from 'redux';

import todos from './redux-modules/todos/reducer';

export default createStore(
  combineReducers({
    todos,
  })
);
