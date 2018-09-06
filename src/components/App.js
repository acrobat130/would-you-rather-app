import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import { fetchUsers } from '../actions/users';
import { setAuthedUserId } from '../actions/authedUserId';

function mapStateToProps(state) {
  const { users, authedUserId } = state;

  return {
    authedUserId,
    users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(fetchUsers()),
    setAuthedUserId: (userId) => dispatch(setAuthedUserId(userId))
  }
}

class App extends Component {
  static propTypes = {
    authedUserId: PropTypes.string,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object
  }

  componentDidMount = () => {
    this.props.getUsers();
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
    )
  }

  renderLogin = ({ location }) => {
    const { users, setAuthedUserId } = this.props;

    return (
      <Login
        users={users}
        setAuthedUserId={setAuthedUserId}
        location={location}
      />
    )
  }

  renderDashboard = () => {
    return (
      <h3>Dashboard</h3>
    )
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
