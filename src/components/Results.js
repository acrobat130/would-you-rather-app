import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionFooter from './QuestionFooter';

function mapStateToProps({ authedUserId, users }) {
  return {
    authedUserId,
    users
  };
}

class Results extends Component {
  static propTypes = {
    authedUserId: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };

  renderProgressBar = (percentage) => {
    const percentageString = `${percentage}%`;
    return (
      <div className="percentage-bar-container">
        <div className="percentage-bar-background">
          <div
            className="percentage-bar-filler"
            style={{ width: percentageString }}
          />
        </div>
        <p className="card__small-text no-margin">{percentageString}</p>
      </div>
    );
  };

  renderOptions = () => {
    const { authedUserId, question } = this.props;
    const { id, optionOne, optionTwo } = question;
    const options = [optionOne, optionTwo];
    const totalVotes = options.reduce((sum, option) => {
      return sum + option.votes.length;
    }, 0);

    return options.map((option, key) => {
      const { text, votes } = option;
      const percentage = Math.round((votes.length / totalVotes) * 100);
      const selected = votes.includes(authedUserId);
      const votesCount = votes.length;
      const votesText = votes.length === 1 ? 'vote' : 'votes';
      const progressBar = this.renderProgressBar(percentage);

      return (
        <div key={`${id}-${key}`} className="card">
          {selected && <p className="card__banner">You selected:</p>}
          <div>
            <p className="card__large-text">{text}</p>
            {progressBar}
            <p className="card__small-text">
              {votesCount} {votesText}
            </p>
          </div>
        </div>
      );
    });
  };

  render() {
    const { question, users } = this.props;

    return (
      <div className="question-card">
        <h2>Would You Rather...</h2>
        <div className="form-container">
          {this.renderOptions()}
          <QuestionFooter question={question} users={users} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Results);
