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
      <form onSubmit={this.handleSubmit}>
        <h3>Would you rather...</h3>
        <label>
          Option 1:
          <textarea
            name="optionOneText"
          />
        </label>
        <h3>or</h3>
        <label>
          Option 2:
          <textarea
            name="optionTwoText"
          />
        </label>
        <button type="submit">Save</button>
      </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
