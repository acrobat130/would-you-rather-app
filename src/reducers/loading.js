import * as types from '../actions/types';

const generateLoadingState = (state, key, isLoading) => ({
  ...state,
  [key]: isLoading
});

export default function loading(state = {}, action) {
  switch (action.type) {
    case types.FETCH_USERS:
      return generateLoadingState(state, 'users', true);

    case types.FETCH_USERS_COMPLETED:
      return generateLoadingState(state, 'users', false);

    case types.SET_AUTHED_USER_ID:
      return generateLoadingState(state, 'authedUserId', true);

    case types.SET_AUTHED_USER_ID_COMPLETED:
      return generateLoadingState(state, 'authedUserId', false);

    case types.FETCH_QUESTIONS:
      return generateLoadingState(state, 'questions', true);

    case types.FETCH_QUESTIONS_COMPLETED:
      return generateLoadingState(state, 'questions', false);

    case types.SAVE_QUESTION:
      return generateLoadingState(state, 'questions', true);

    case types.SAVE_QUESTION_COMPLETED:
      return generateLoadingState(state, 'questions', false);

    case types.SUBMIT_VOTE_STARTED:
      return {
        ...state,
        questions: true,
        users: true
      };

    default:
      return state;
  }
}
