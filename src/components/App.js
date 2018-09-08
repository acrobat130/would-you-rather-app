import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import { fetchUsers } from '../actions/users';
import { fetchQuestions } from '../actions/questions';
import { setAuthedUserId } from '../actions/authedUserId';
import Login from './Login';
import Dashboard from './Dashboard';
import _ from '../utils/lodash';

const getQuestionsByStatus = (authedUserId, questions) => {
  let answered = {};
  let unanswered = {};

  _.forEach(questions, question => {
    const { optionOne, optionTwo } = question;
    const votes = optionOne.votes.concat(optionTwo.votes);

    if (votes.includes(authedUserId)) {
      return answered = {
        ...answered,
        [question.id]: question
      }
    }

    unanswered = {
      ...unanswered,
      [question.id]: question
    };
  });

  return {
    answered,
    unanswered
  };
}

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
    setAuthedUserId: (userId) => dispatch(setAuthedUserId(userId))
  }
}

class App extends Component {
  static propTypes = {
    authedUserId: PropTypes.string,
    getUsers: PropTypes.func.isRequired,
    questions: PropTypes.object.isRequired,
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
      <div className="right">
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
    const { authedUserId, questions, users } = this.props;
    const questionsByStatus = getQuestionsByStatus(authedUserId, questions);
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

  renderTestRoute = () => {
    return <h3>Test Route</h3>
  }

  render() {
    const { authedUserId } = this.props;

    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            {authedUserId && this.renderUserDetails()}
          </nav>
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
              path="/test"
              render={this.renderTestRoute}
              isAuthenticated={!!authedUserId}
            />
            <Route
              path="/login"
              render={this.renderLogin}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
