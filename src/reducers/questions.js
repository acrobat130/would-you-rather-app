import * as types from '../actions/types';

export default function questions(state = {}, action) {
  switch(action.type) {
    case types.RECEIVE_QUESTIONS:
      return action.questions;

    case types.SAVE_QUESTION:
      const { question } = action;

      return {
        ...state,
        [question.id]: question
      }

    default:
      return state;
  }
}
