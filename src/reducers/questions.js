import * as types from '../actions/types';

export default function questions(state = {}, action) {
  switch (action.type) {
    case types.FETCH_QUESTIONS_COMPLETED:
      return action.questions;

    case types.SAVE_QUESTION_COMPLETED:
      const { question } = action;

      return {
        ...state,
        [question.id]: question
      };

    default:
      return state;
  }
}
