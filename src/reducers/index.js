import { combineReducers } from 'redux';
import authedUserId from './authedUserId';
import users from './users';
import questions from './questions';
import loading from './loading';

export default combineReducers({
  authedUserId,
  loading,
  questions,
  users
});
