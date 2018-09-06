import { combineReducers } from 'redux';
import authedUserId from './authedUserId';
import users from './users';

export default combineReducers({
  authedUserId,
  users
});
