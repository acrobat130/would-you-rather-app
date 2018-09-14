import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from '../utils/lodash';
import { isQuestionAnswered } from '../utils/questions-helper';
import QuestionTeaser from './QuestionTeaser';

function sortQuestions(questions) {
  return _.map(questions, question => question)
    .sort((a, b) => a.timestamp < b.timestamp);
}

function getQuestionsByStatus(authedUserId, questions, users) {
  const sortedQuestions = sortQuestions(questions);
  const answered = sortedQuestions.filter(question => isQuestionAnswered(authedUserId, question.id, users));
  const unanswered = sortedQuestions.filter(question => !isQuestionAnswered(authedUserId, question.id, users));

  return {
    answered,
    unanswered
  };
}

function mapStateToProps({ authedUserId, questions, users }) {
  const questionsByStatus = getQuestionsByStatus(authedUserId, questions, users);
  const { answered, unanswered } = questionsByStatus;

  return {
    authedUserId,
    answered,
    unanswered,
    users
  }
}

class Dashboard extends Component {
  static propTypes = {
    authedUserId: PropTypes.string.isRequired,
    answered: PropTypes.array.isRequired,
    unanswered: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired
  }

  state = {
    activeTab: 'unanswered'
  }

  selectQuestions = () => {
    const { activeTab } = this.state;

    return this.props[activeTab];
  }

  handleTabClick = (e) => {
    const activeTab = e.target.value;

    e.preventDefault();
    this.setState({ activeTab });
  }

  renderTabButton = (text, value) => {
    const { activeTab } = this.state;

    return (
      <button
        type="button"
        onClick={this.handleTabClick}
        value={value}
        disabled={activeTab === value}
      >
        {text}
      </button>
    );
  }

  renderQuestions = () => {
    const questions = this.selectQuestions();

    return questions.map(question => {
      return (
        <QuestionTeaser
          key={question.id}
          question={question}
        />
      );
    });
  }

  render() {

    return (
      <div>
        <h2>Dashboard</h2>
        {this.renderTabButton('Unanswered Questions', 'unanswered')}
        {this.renderTabButton('Answered Questions', 'answered')}
        <ul>{this.renderQuestions()}</ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
