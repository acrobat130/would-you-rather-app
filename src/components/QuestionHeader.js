import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class QuestionHeader extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  }

  render() {
    const { question, users } = this.props;
    const { author } = question;
    const user = users[author];
    const { avatarURL, name } = user;

    return (
      <div>
        <img
          className="image"
          src={avatarURL}
          alt="avatar"
        />
        <p>Submitted by {name}</p>
        <h2>Would You Rather...</h2>
      </div>
    );
  }
}
