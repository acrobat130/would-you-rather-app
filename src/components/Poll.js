import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionHeader from './QuestionHeader';

export default class Poll extends Component {
  static propTypes = {
    authedUserId: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    submitVote: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
  }

  state = {
    selectedOption: ''
  }

  handleAnswerSelect = (e) => {
    const selectedOption = e.target.value;

    this.setState({ selectedOption });
  }

  handleSubmit = (e) => {
    const { authedUserId, question, submitVote } = this.props;
    const { selectedOption } = this.state;

    e.preventDefault();

    submitVote(authedUserId, question.id, selectedOption);
  }

  render() {
    const { question, users } = this.props;
    const { id, optionOne, optionTwo } = question;
    const { selectedOption } = this.state;

    return (
      <div>
        <QuestionHeader question={question} users={users} />
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              name={id}
              onClick={this.handleAnswerSelect}
              type="radio"
              value="optionOne"
            />
            {optionOne.text}
          </label>
          <label>
            <input
              name={id}
              onClick={this.handleAnswerSelect}
              type="radio"
              value="optionTwo"
            />
            {optionTwo.text}
          </label>
          <button
            type="submit"
            disabled={selectedOption === ''}
          >
            Vote
          </button>
        </form>
      </div>
    );
  }
}