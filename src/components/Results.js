import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionHeader from './QuestionHeader';

export default class Results extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  }

  renderOptions = () => {
    const { question } = this.props;
    const { id, optionOne, optionTwo } = question;
    const options = [optionOne, optionTwo];
    const totalVotes = options.reduce((sum, option) => {
      return sum + option.votes.length;
    }, 0);

    return options.map((option, key) => {
      const { text, votes } = option;
      const percentage = Math.round(votes.length / totalVotes * 100);

      return (
        <div key={`${id}-${key}`}>
          <p>{text}</p>
          <p>{votes.length} votes</p>
          <p>{percentage}%</p>
        </div>
      );
    });
  }

  render() {
    const { question, users } = this.props;

    return (
      <div>
        <QuestionHeader question={question} users={users} />
        {this.renderOptions()}
      </div>
    )
  }
}
