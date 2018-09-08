import { combineReducers } from 'redux';
import authedUserId from './authedUserId';
import users from './users';
import questions from './questions';

export default combineReducers({
  authedUserId,
  questions,
  users
});
