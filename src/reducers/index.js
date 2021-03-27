import { combineReducers } from 'redux';
import todos from './todos';
import account from './account/authenticate';
import level from './account/level';
import signup from './account/signUp';

const rootReducer = combineReducers({
  todos,
  account,
  level,
  signup,
});

export default rootReducer;
