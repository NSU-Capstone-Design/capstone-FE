import { combineReducers } from 'redux';
import todos from './todos';
import account from './account/authenticate';
import level from './account/level';
import signup from './account/signUp';
import levelTestProbs from './account/levelTestProbs';
import groupCreate from './account/groupCreate';

const rootReducer = combineReducers({
  todos,
  account,
  level,
  levelTestProbs,
  signup,
  groupCreate,
});

export default rootReducer;
