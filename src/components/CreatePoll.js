import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import { postQuestion } from '../actions/questions';
import Loading from './Loading';

function mapStateToProps({ authedUserId, loading }) {
  return {
    authedUserId,
    isLoading: loading.authedUserId || loading.questions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postQuestion: (question) => dispatch(postQuestion(question))
  }
}

class CreatePoll extends Component {
  static propTypes = {
    authedUserId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    postQuestion: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    const { authedUserId, postQuestion } = this.props;
    const form = e.target;

    e.preventDefault()

    const question = serialize(form, { hash: true });

    question.author = authedUserId;
    postQuestion(question);
  }

  renderOption = (label, name, placeholder) => {
    return (
      <label>
        <p>{label}</p>
        <textarea
          name={name}
          placeholder={placeholder}
        />
      </label>
    );
  }

  renderSaveButton = () => {
    const { isLoading } = this.props;

    if (isLoading) {
      return <Loading />
    }

    return (
      <button type="submit">Save</button>
    );
  }

  render() {
    const optionOne = this.renderOption('Option 1:', 'optionOneText', 'Learn to do a handstand');
    const optionTwo = this.renderOption('Option 2:', 'optionTwoText', 'Learn to ski');
    const saveButton = this.renderSaveButton();

    return (
      <div>
        <h2>Create a New Poll</h2>
        <div className="form-container">
          <h3>Would you rather...</h3>
          <form onSubmit={this.handleSubmit} className="form">
            {optionOne}
            <h3>or</h3>
            {optionTwo}
            {saveButton}
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
