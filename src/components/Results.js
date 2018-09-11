import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionHeader from './QuestionHeader';

export default class Results extends Component {
  static propTypes = {
    authedUserId: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  }

  renderOptions = () => {
    const { authedUserId, question } = this.props;
    const { id, optionOne, optionTwo } = question;
    const options = [optionOne, optionTwo];
    const totalVotes = options.reduce((sum, option) => {
      return sum + option.votes.length;
    }, 0);

    return options.map((option, key) => {
      const { text, votes } = option;
      const percentage = Math.round(votes.length / totalVotes * 100);
      const selected = votes.includes(authedUserId);

      return (
        <div key={`${id}-${key}`}>
          {selected && <p style={{backgroundColor: 'antiquewhite'}}>You selected:</p>}
          <div>
            <p>{text}</p>
            <p>{votes.length} votes</p>
            <p>{percentage}%</p>
          </div>
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
