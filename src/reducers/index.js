import { combineReducers } from 'redux';
import todos from './todos';
import account from './account/authenticate';
import level from './account/level';
import signup from './account/signUp';
import levelTestProbs from './account/levelTestProbs';
import userLevelProb from './userLevelProb';
import groupCreate from './account/groupCreate';
import qaPost from './qaPost';

const rootReducer = combineReducers({
  todos,
  account,
  level,
  levelTestProbs,
  signup,
  userLevelProb,
  groupCreate,
  qaPost,
});

export default rootReducer;
