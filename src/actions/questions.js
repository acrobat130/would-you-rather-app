import { _getQuestions, _saveQuestion } from '../utils/_DATA.js';
import { history } from '../utils/history';
import * as types from './types';

function fetchQuestionsStarted() {
  return {
    type: types.FETCH_QUESTIONS
  };
}

function fetchQuestionsCompleted(questions) {
  return {
    type: types.FETCH_QUESTIONS_COMPLETED,
    questions
  };
}

function saveQuestionStarted() {
  return {
    type: types.SAVE_QUESTION
  };
}

function saveQuestionCompleted(question) {
  return {
    type: types.SAVE_QUESTION_COMPLETED,
    question
  };
}

export function fetchQuestions() {
  return (dispatch) => {
    dispatch(fetchQuestionsStarted());

    return _getQuestions()
      .then((questions) => dispatch(fetchQuestionsCompleted(questions)))
      .catch((error) => console.error('could not fetch questions.', error));
  };
}

export function postQuestion(question) {
  return (dispatch) => {
    dispatch(saveQuestionStarted());
    return _saveQuestion(question)
      .then((newQuestion) => {
        dispatch(saveQuestionCompleted(newQuestion));
        history.push('/');
      })
      .catch((error) => console.error('could not save question.', error));
  };
}
