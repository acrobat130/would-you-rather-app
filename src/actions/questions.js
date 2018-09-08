import { _getQuestions } from '../utils/_DATA.js';
import * as types from './types';

function receiveQuestions(questions) {
  return {
    type: types.RECEIVE_QUESTIONS,
    questions
  }
}

export function fetchQuestions() {
  return (dispatch) => {
    return _getQuestions()
      .then(questions => dispatch(receiveQuestions(questions)))
      .catch(error => console.error('could not fetch questions.', error))
  }
}