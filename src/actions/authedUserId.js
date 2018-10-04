import * as types from './types';

export function setAuthedUserId(userId) {
  return {
    type: types.SET_AUTHED_USER_ID_COMPLETED,
    userId
  };
}
