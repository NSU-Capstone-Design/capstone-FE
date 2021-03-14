import { combineReducers } from 'redux';
import todos from './todos';
import account from './account/authenticate';
import level from './account/level';

const rootReducer = combineReducers({
  todos,
  account,
  level,
});

export default rootReducer;
