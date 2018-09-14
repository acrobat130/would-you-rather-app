import { _saveQuestionAnswer } from '../utils/_DATA.js';
import { fetchQuestions } from './questions';
import { fetchUsers } from './users';

export function submitVote(authedUserId, questionId, answer) {
  return (dispatch) => {
    return _saveQuestionAnswer({ authedUserId, questionId, answer })
      .then(() => {
        dispatch(fetchQuestions());
        dispatch(fetchUsers());
      })
      .catch(error => console.error('could not save your answer.', error))
  }
}