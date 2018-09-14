import * as types from '../actions/types';

function saveQuestion(state, action) {
  const userId = action.question.author;
  const userQuestions = state[userId].questions;
  const questions = [
    ...userQuestions,
    action.question.id
  ];
  const newState = { ...state };

  newState[userId] = {
      ...state[userId],
      questions
    }

  return newState;
}

export default function users(state = {}, action) {
  switch(action.type) {
    case types.RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }

    case types.SAVE_QUESTION:
      return saveQuestion(state, action);

    default:
      return state;
  }
}
