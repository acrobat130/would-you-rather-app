import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { _getUsers } from '../utils/_DATA.js';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';

class App extends Component {
  state = {
    users: {},
    authedUserId: ''
  }

  componentDidMount = () => {
    return _getUsers()
      .then(users => this.setState({ users }))
      .catch(error => console.error('could not fetch users.', error))
  }

  setAuthedUserId = (authedUserId) => {
    this.setState({ authedUserId });
  }

  renderLogin = ({ location }) => {
    const { users } = this.state;

    return (
      <Login
        users={users}
        setAuthedUserId={this.setAuthedUserId}
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
    const { authedUserId } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
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

export default App;
