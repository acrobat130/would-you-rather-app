import * as types from '../actions/types';
import _ from '../utils/lodash';

function sortQuestions(questions) {
  return _.map(questions, question => question)
    .sort((a, b) => a.timestamp < b.timestamp);
}

function saveQuestion(state, action) {
  const questions = [
    ...state,
    action.question
  ];

  return sortQuestions(questions);
}

export default function questions(state = [], action) {
  switch(action.type) {
    case types.RECEIVE_QUESTIONS:
      return sortQuestions(action.questions);

    case types.SAVE_QUESTION:
      return saveQuestion(state, action);

    default:
      return state;
  }
}
