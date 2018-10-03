import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class QuestionTeaser extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired
  }

  render() {
    const { question } = this.props;
    const { id, optionOne, timestamp } = question;
    const date = new Date(timestamp).toDateString();

    return (
      <Link to={`/question/${id}`} className="card-link">
        <li className="card">
          <p className="card__small-text">Would You Rather:</p>
          <p className="card__large-text">{optionOne.text} or...</p>
          <p className="card__footer">created: {date}</p>
        </li>
      </Link>
    );
  }
}
