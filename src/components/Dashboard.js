import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from '../utils/lodash';

export default class Dashboard extends Component {
  static propTypes = {
    authedUserId: PropTypes.string.isRequired,
    answered: PropTypes.object.isRequired,
    unanswered: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  }

  state = {
    activeTab: 'unanswered'
  }

  selectQuestions = () => {
    const { activeTab } = this.state;

    return this.props[activeTab];
  }

  handleTabClick = (e) => {
    const activeTab = e.target.value;

    e.preventDefault();
    this.setState({ activeTab });
  }

  renderTabButton = (text, value) => {
    const { activeTab } = this.state;

    return (
      <button
        type="button"
        onClick={this.handleTabClick}
        value={value}
        disabled={activeTab === value}
      >
        {text}
      </button>
    );
  }

  renderQuestions = () => {
    const questions = this.selectQuestions();

    return _.map(questions, question => {
      const { optionOne, optionTwo } = question;

      return (
        <li key={question.id}>
          <p>Would You Rather:</p>
          <p>{optionOne.text} or...</p>
        </li>
      );
    });
  }

  render() {

    return (
      <div>
        {this.renderTabButton('Unanswered Questions', 'unanswered')}
        {this.renderTabButton('Answered Questions', 'answered')}
        <ul>{this.renderQuestions()}</ul>
      </div>
    );

  }
}
