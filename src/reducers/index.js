import { combineReducers } from 'redux';
import todos from './todos';
import account from './account';

const rootReducer = combineReducers({
  todos,
  account,
});

export default rootReducer;
