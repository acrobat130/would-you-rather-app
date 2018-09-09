import React, { Component } from 'react';
import { Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../utils/history';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import { fetchUsers } from '../actions/users';
import { fetchQuestions } from '../actions/questions';
import { setAuthedUserId } from '../actions/authedUserId';
import { submitVote } from '../actions/shared';
import Login from './Login';
import Dashboard from './Dashboard';
import Poll from './Poll';
import Results from './Results';
import _ from '../utils/lodash';

function mapStateToProps(state) {
  const { authedUserId, questions, users } = state;

  return {
    authedUserId,
    questions,
    users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(fetchUsers()),
    getQuestions: () => dispatch(fetchQuestions()),
    setAuthedUserId: (userId) => dispatch(setAuthedUserId(userId)),
    submitVote: (userId, questionId, vote) => dispatch(submitVote(userId, questionId, vote))
  }
}

class App extends Component {
  static propTypes = {
    authedUserId: PropTypes.string,
    getUsers: PropTypes.func.isRequired,
    questions: PropTypes.object.isRequired,
    submitVote: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
  }

  componentDidMount = () => {
    this.props.getUsers();
    this.props.getQuestions();
  }

  handleLogout = (e) => {
    e.preventDefault();

    this.props.setAuthedUserId('');
  }

  isQuestionAnswered = (questionId) => {
    const { authedUserId, users } = this.props;
    const user = users[authedUserId];
    const answeredQuestionIds = Object.keys(user.answers);

    return answeredQuestionIds.includes(questionId);
  }

  getQuestionsByStatus = () => {
    const { questions } = this.props;
    const answered = {};
    const unanswered = {};

    Object.keys(questions).forEach(questionId => {
      const question = questions[questionId];

      if (this.isQuestionAnswered(questionId)) {
        return answered[questionId] = question;
      }

      return unanswered[questionId] = question;
    });

    return {
      answered,
      unanswered
    };
  }

  renderLogoutButton = () => {
    const { authedUserId } = this.props;

    return (
      <form onSubmit={this.handleLogout}>
        <button
          type="submit"
          disabled={!authedUserId}
        >
          Logout
        </button>
      </form>
    )
  }

  renderUserDetails = () => {
    const { authedUserId, users } = this.props;
    const user = users[authedUserId];
    const { name, avatarURL } = user;

    return (
      <div className="nav-items-group">
        <img
          className="App-logo"
          src={avatarURL}
          alt="avatar"
        />
        <h3>{name}</h3>
        {this.renderLogoutButton()}
      </div>
    );
  }

  renderNav = () => {
    const { authedUserId } = this.props;

    if (!authedUserId) {
      return null;
    }

    return (
      <nav>
        <div className="nav-items-group">
          <Link to="/">Dashboard</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/new-poll">New Poll</Link>
        </div>
        {this.renderUserDetails()}
      </nav>
    );
  }

  renderLogin = ({ location }) => {
    const { users, setAuthedUserId } = this.props;

    return (
      <Login
        users={users}
        setAuthedUserId={setAuthedUserId}
        location={location}
      />
    );
  }

  renderDashboard = () => {
    const { authedUserId, users } = this.props;
    const questionsByStatus = this.getQuestionsByStatus();
    const { answered, unanswered } = questionsByStatus;

    return (
      <Dashboard
        authedUserId={authedUserId}
        answered={answered}
        unanswered={unanswered}
        users={users}
      />
    );
  }

  renderLeaderboard = () => {
    return <h3>Leaderboard</h3>
  }

  renderNewPoll = () => {
    return <h3>Create a New Poll</h3>
  }

  renderQuestion = ({ match }) => {
    const { authedUserId, questions, submitVote, users } = this.props;
    const questionId = match.params.id;
    const question = questions[questionId];
    const isAnswered = this.isQuestionAnswered(questionId);

    if (isAnswered) {
      return (
        <Results
          question={question}
          users={users}
        />
      )
    }

    return (
      <Poll
        authedUserId={authedUserId}
        question={question}
        submitVote={submitVote}
        users={users}
      />
    );
  }

  render() {
    const { authedUserId } = this.props;

    return (
      <Router history={history}>
        <div className="App">
          {this.renderNav()}
          <header className="App-header">
            <h1 className="App-title">Would You Rather</h1>
          </header>
          <Switch>
            <ProtectedRoute
              path="/"
              exact
              render={this.renderDashboard}
              isAuthenticated={!!authedUserId}
            />
            <ProtectedRoute
              path="/leaderboard"
              render={this.renderLeaderboard}
              isAuthenticated={!!authedUserId}
            />
            <ProtectedRoute
              path="/new-poll"
              render={this.renderNewPoll}
              isAuthenticated={!!authedUserId}
            />
            <ProtectedRoute
              path="/question/:id"
              render={this.renderQuestion}
              isAuthenticated={!!authedUserId}
            />
            <Route
              path="/login"
              render={this.renderLogin}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
