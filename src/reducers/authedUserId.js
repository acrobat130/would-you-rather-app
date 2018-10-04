import * as types from '../actions/types';

export default function authedUserId(state = '', action) {
  switch (action.type) {
    case types.SET_AUTHED_USER_ID_COMPLETED:
      return action.userId;

    default:
      return state;
  }
}
