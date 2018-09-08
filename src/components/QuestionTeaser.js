import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class QuestionTeaser extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired
  }

  render() {
    const { question } = this.props;
    const { id, optionOne } = question;

    return (
      <Link to={`/question/${id}`} className="question-teaser-link">
        <li className="question-teaser">
          <p>Would You Rather:</p>
          <p>{optionOne.text} or...</p>
        </li>
      </Link>
    );
  }
}
