import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default class ProtectedRoute extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  render() {
    const { isAuthenticated, location } = this.props;

    if (isAuthenticated) {
      return <Route {...this.props} />;
    }

    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            referrer: location
          }
        }}
      />
    );
  }
}
