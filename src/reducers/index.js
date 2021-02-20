import { combineReducers } from 'redux';
import todos from './todos';
import account from './account/authenticate';

const rootReducer = combineReducers({
  todos,
  account,
});

export default rootReducer;
