import { _saveQuestionAnswer } from '../utils/_DATA.js';
import { history } from '../utils/history';
import { fetchQuestions } from './questions';
import { fetchUsers } from './users';
import * as types from './types';

function receiveUsers(users) {
  return {
    type: types.RECEIVE_USERS,
    users
  }
}

export function submitVote(authedUserId, questionId, answer) {
  console.log("params----", authedUserId, questionId, answer)
  return (dispatch) => {
    return _saveQuestionAnswer({ authedUserId, questionId, answer })
      .then(() => {
        dispatch(fetchQuestions());
        dispatch(fetchUsers());
      })
      .catch(error => console.error('could not save your answer.', error))
  }
}