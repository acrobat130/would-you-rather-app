import { _getUsers } from '../utils/_DATA.js';
import * as types from './types';

function receiveUsers(users) {
  return {
    type: types.RECEIVE_USERS,
    users
  }
}

export function fetchUsers() {
  return (dispatch) => {
    return _getUsers()
      .then(users => dispatch(receiveUsers(users)))
      .catch(error => console.error('could not fetch users.', error))
  }
}