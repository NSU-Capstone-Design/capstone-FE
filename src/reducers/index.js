import { combineReducers } from 'redux';
import todos from './todos';
import account from './account/authenticate';
import level from './account/level';
import signup from './account/signUp';
import levelTestProbs from './account/levelTestProbs';
import groupCreate from './account/groupCreate';
import userLevelProb from './userLevelProb';

const rootReducer = combineReducers({
  todos,
  account,
  level,
  levelTestProbs,
  signup,
  groupCreate,
  userLevelProb,
});

export default rootReducer;
