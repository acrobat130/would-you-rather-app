import { _saveQuestionAnswer } from '../utils/_DATA.js';
import { fetchQuestions } from './questions';
import { fetchUsers } from './users';
import * as types from './types';

function submitVoteStarted() {
  return {
    type: types.SUBMIT_VOTE_STARTED
  }
}

export function submitVote(authedUserId, questionId, answer) {
  return (dispatch) => {
    dispatch(submitVoteStarted());

    return _saveQuestionAnswer({ authedUserId, questionId, answer })
      .then(() => {
        dispatch(fetchQuestions());
        dispatch(fetchUsers());
      })
      .catch(error => console.error('could not save your answer.', error))
  }
}