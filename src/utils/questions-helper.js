export function isQuestionAnswered(authedUserId, questionId, users) {
  const user = users[authedUserId];
  const answeredQuestionIds = Object.keys(user.answers);

  return answeredQuestionIds.includes(questionId);
}
