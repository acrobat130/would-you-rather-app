import * as types from '../actions/types';

// sort questions with newest-created questions showing first
function sortQuestions(questions) {
  const sortedQuestions = {};
  const sortedIds = Object.keys(questions).sort((qid1, qid2) => {
    return questions[qid1].timestamp < questions[qid2].timestamp;
  });

  sortedIds.forEach(id => sortedQuestions[id] = questions[id]);

  return sortedQuestions;
}

export default function questions(state = {}, action) {
  switch(action.type) {
    case types.RECEIVE_QUESTIONS:
      const sortedQuestions = sortQuestions(action.questions);

      return {
        ...state,
        ...sortedQuestions
      }

    default:
      return state;
  }
}
