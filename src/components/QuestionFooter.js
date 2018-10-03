import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class QuestionFooter extends Component {
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
      <div className="card__footer">
        <img
          className="image"
          src={avatarURL}
          alt="avatar"
        />
        <p>Submitted by {name}</p>
      </div>
    );
  }
}
