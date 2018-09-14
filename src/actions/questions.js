import { _getQuestions, _saveQuestion } from '../utils/_DATA.js';
import { history } from '../utils/history';
import * as types from './types';

function receiveQuestions(questions) {
  return {
    type: types.RECEIVE_QUESTIONS,
    questions
  }
}

function saveQuestion(question) {
  return  {
    type: types.SAVE_QUESTION,
    question
  }
}

export function fetchQuestions() {
  return (dispatch) => {
    return _getQuestions()
      .then(questions => dispatch(receiveQuestions(questions)))
      .catch(error => console.error('could not fetch questions.', error))
  }
}

export function postQuestion(question) {
  return (dispatch) => {
    return _saveQuestion(question)
      .then(newQuestion => {
        dispatch(saveQuestion(newQuestion));
        history.push('/');
      })
      .catch(error => console.error('could not save question.', error))
  }
}
