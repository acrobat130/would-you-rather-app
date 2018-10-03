import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import { postQuestion } from '../actions/questions';

function mapStateToProps({ authedUserId }) {
  return {
    authedUserId
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

  render() {
    return (
      <div>
        <h2>Create a New Poll</h2>
        <div className="form-container">
          <h3>Would you rather...</h3>
          <form onSubmit={this.handleSubmit} className="form">
            <label>
              <p>Option 1:</p>
              <textarea
                name="optionOneText"
                placeholder="Learn to do a handstand"
              />
            </label>
            <h3>or</h3>
            <label>
              <p>Option 2:</p>
              <textarea
                name="optionTwoText"
                placeholder="Learn to ski"
              />
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
