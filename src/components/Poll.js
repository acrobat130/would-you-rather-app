import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitVote } from '../actions/shared';
import QuestionFooter from './QuestionFooter';
import Loading from './Loading';

function mapStateToProps({ authedUserId, loading, users }) {
  return {
    authedUserId,
    users,
    isLoading: loading.authedUserId || loading.users
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
    isLoading: PropTypes.bool,
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

  renderOptions = (optionValues) => {
    const { question } = this.props;
    const { id } = question;

    return optionValues.map(value => {
      const text = question[value].text;

      return (
        <label key={value}>
          <input
            name={id}
            onClick={this.handleAnswerSelect}
            type="radio"
            value={value}
          />
          {text}
        </label>
      );
    })
  }

  renderButton = () => {
    const { isLoading } = this.props;
    const { selectedOption } = this.state;

    if (isLoading) {
      return <Loading />
    }

    return (
      <button
        type="submit"
        disabled={selectedOption === ''}
      >
        Vote
      </button>
    );
  }

  render() {
    const { question, users } = this.props;
    const optionValues = ['optionOne', 'optionTwo'];
    const options = this.renderOptions(optionValues)
    const button = this.renderButton();

    return (
      <div className="question-card">
        <h2>Would You Rather...</h2>
        <div className="form-container">
          <form onSubmit={this.handleSubmit} className="form">
            {options}
            {button}
          </form>
          <QuestionFooter question={question} users={users} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
