import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitVote } from '../actions/shared';
import QuestionFooter from './QuestionFooter';

function mapStateToProps({ authedUserId, users }) {
  return {
    authedUserId,
    users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitVote: (userId, questionId, vote) => dispatch(submitVote(userId, questionId, vote))
  }
}

class Poll extends Component {
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
      <div className="question-card">
        <h2>Would You Rather...</h2>
        <div className="form-container">
          <form onSubmit={this.handleSubmit} className="form">
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
          <QuestionFooter question={question} users={users} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
