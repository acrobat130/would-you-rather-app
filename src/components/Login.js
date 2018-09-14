import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from '../utils/lodash';
import { setAuthedUserId } from '../actions/authedUserId';

function mapStateToProps({ users }) {
  return {
    users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUserId: (userId) => dispatch(setAuthedUserId(userId)),
  }
}

class Login extends Component {
  static propTypes = {
    users: PropTypes.object,
    setAuthedUserId: PropTypes.func.isRequired,
    location: PropTypes.object
  }

  state = {
    selectedUserId: '',
    shouldRedirect: false
  }

  setSelectedUserId = (selectedUserId) => {
    this.setState({ selectedUserId });
  }

  setShouldRedirect = (shouldRedirect) => {
    this.setState({ shouldRedirect });
  }

  handleChange = (e) => {
    const selectedUserId = e.target.value;

    this.setSelectedUserId(selectedUserId);
  }

  handleSubmit = (e) => {
    const { selectedUserId } = this.state;

    e.preventDefault();
    this.props.setAuthedUserId(selectedUserId);
    this.setShouldRedirect(true);
  }

  renderOptions = () => {
    const { users } = this.props;
    const firstOption = <option disabled value='' key='disabled'>Select a user...</option>
    const options = _.map(users, user => {
      const { id, name } = user;

      return (
        <option value={id} key={id}>{name}</option>
      )
    });

    options.unshift(firstOption);
    return options;
  }

  render() {
    const locationState = this.props.location.state;
    const referrerPathname = _.isEmpty(locationState) ? '/' : locationState.referrer.pathname;
    const { selectedUserId, shouldRedirect } = this.state;

    if (shouldRedirect) {
      return (
        <Redirect 
          to={{ pathname: referrerPathname }}
        />
      )
    }

    return (
      <div>
        <p className="App-intro">
          Please log in.
        </p>
        <select
          value={selectedUserId}
          onChange={this.handleChange}
        >
          {this.renderOptions()}
        </select>
        <form onSubmit={this.handleSubmit}>
          <button
            type="submit"
            disabled={selectedUserId === ''}
          >
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
