import * as types from '../actions/types';

function saveQuestion(state, action) {
  const userId = action.question.author;
  const userQuestions = state[userId].questions;
  const questions = [...userQuestions, action.question.id];

  return {
    ...state,
    [userId]: {
      ...state[userId],
      questions
    }
  };
}

export default function users(state = {}, action) {
  switch (action.type) {
    case types.FETCH_USERS_COMPLETED:
      return action.users;

    case types.SAVE_QUESTION_COMPLETED:
      return saveQuestion(state, action);

    default:
      return state;
  }
}
