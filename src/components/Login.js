import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from '../utils/lodash';
import { setAuthedUserId } from '../actions/authedUserId';
import Loading from './Loading';

function mapStateToProps({ loading, users }) {
  return {
    isLoading: loading.users,
    users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUserId: (userId) => dispatch(setAuthedUserId(userId))
  };
}

class Login extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    location: PropTypes.object,
    setAuthedUserId: PropTypes.func.isRequired,
    users: PropTypes.object
  };

  state = {
    selectedUserId: '',
    shouldRedirect: false
  };

  setSelectedUserId = (selectedUserId) => {
    this.setState({ selectedUserId });
  };

  setShouldRedirect = (shouldRedirect) => {
    this.setState({ shouldRedirect });
  };

  handleChange = (e) => {
    const selectedUserId = e.target.value;

    this.setSelectedUserId(selectedUserId);
  };

  handleSubmit = (e) => {
    const { selectedUserId } = this.state;

    e.preventDefault();
    this.props.setAuthedUserId(selectedUserId);
    this.setShouldRedirect(true);
  };

  renderOptions = () => {
    const { users } = this.props;
    const firstOption = (
      <option disabled value="" key="disabled">
        Select a user...
      </option>
    );
    const options = _.map(users, (user) => {
      const { id, name } = user;

      return (
        <option value={id} key={id}>
          {name}
        </option>
      );
    });

    options.unshift(firstOption);
    return options;
  };

  renderSelect = () => {
    const { isLoading } = this.props;
    const { selectedUserId } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <select value={selectedUserId} onChange={this.handleChange}>
        {this.renderOptions()}
      </select>
    );
  };

  render() {
    const locationState = this.props.location.state;
    const referrerPathname = _.isEmpty(locationState)
      ? '/'
      : locationState.referrer.pathname;
    const { selectedUserId, shouldRedirect } = this.state;
    const selectBox = this.renderSelect();

    if (shouldRedirect) {
      return <Redirect to={{ pathname: referrerPathname }} />;
    }

    return (
      <div>
        <header>
          <h1 className="App-title">Would You Rather App</h1>
        </header>
        <div className="form-container">
          <h3>Please sign in</h3>
          <form className="form" onSubmit={this.handleSubmit}>
            {selectBox}
            <button type="submit" disabled={selectedUserId === ''}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
