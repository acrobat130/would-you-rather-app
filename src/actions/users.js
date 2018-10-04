import { _getUsers } from '../utils/_DATA.js';
import * as types from './types';

function fetchUsersCompleted(users) {
  return {
    type: types.FETCH_USERS_COMPLETED,
    users
  };
}

function fetchUsersLoading() {
  return {
    type: types.FETCH_USERS
  };
}

export function fetchUsers() {
  return (dispatch) => {
    dispatch(fetchUsersLoading());

    return _getUsers()
      .then((users) => dispatch(fetchUsersCompleted(users)))
      .catch((error) => console.error('could not fetch users.', error));
  };
}
