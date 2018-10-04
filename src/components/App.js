import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../utils/history';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import { fetchUsers } from '../actions/users';
import { fetchQuestions } from '../actions/questions';
import Login from './Login';
import Dashboard from './Dashboard';
import Poll from './Poll';
import Results from './Results';
import CreatePoll from './CreatePoll';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import PageNotFound from './PageNotFound';
import { isQuestionAnswered } from '../utils/questions-helper';

function mapStateToProps(state) {
  const { authedUserId, questions, users } = state;

  return {
    authedUserId,
    questions,
    users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(fetchUsers()),
    getQuestions: () => dispatch(fetchQuestions())
  };
}

class App extends Component {
  static propTypes = {
    authedUserId: PropTypes.string,
    getUsers: PropTypes.func.isRequired,
    questions: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    this.props.getUsers();
    this.props.getQuestions();
  };

  renderLogin = ({ location }) => {
    return <Login location={location} />;
  };

  renderQuestion = ({ match }) => {
    const { authedUserId, questions, users } = this.props;
    const questionId = match.params.id;
    const question = questions[questionId];

    if (!question) {
      return <PageNotFound />;
    }

    const isAnswered = isQuestionAnswered(authedUserId, questionId, users);

    if (isAnswered) {
      return <Results question={question} />;
    }

    return <Poll question={question} />;
  };

  render() {
    const { authedUserId } = this.props;

    return (
      <Router history={history}>
        <div className="App">
          <Nav />
          <Switch>
            <ProtectedRoute
              path="/"
              exact
              component={Dashboard}
              isAuthenticated={!!authedUserId}
            />
            <ProtectedRoute
              path="/leaderboard"
              component={Leaderboard}
              isAuthenticated={!!authedUserId}
            />
            <ProtectedRoute
              path="/add"
              component={CreatePoll}
              isAuthenticated={!!authedUserId}
            />
            <ProtectedRoute
              path="/question/:id"
              render={this.renderQuestion}
              isAuthenticated={!!authedUserId}
            />
            <Route path="/login" render={this.renderLogin} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
