import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAuthedUserId } from '../actions/authedUserId';

function mapStateToProps({ authedUserId, users }) {
  return {
    authedUserId,
    users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUserId: (userId) => dispatch(setAuthedUserId(userId))
  }
}

class Nav extends Component {
  static propTypes = {
    authedUserId: PropTypes.string.isRequired,
    setAuthedUserId: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
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
      <div className="nav-items-group">
        <img
          className="image"
          src={avatarURL}
          alt="avatar"
        />
        <h3>{name}</h3>
        {this.renderLogoutButton()}
      </div>
    );
  }

  render() {
    const { authedUserId } = this.props;

    if (!authedUserId) {
      return null;
    }

    return (
      <nav>
        <div className="nav-items-group">
          <Link to="/">Dashboard</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/add">New Poll</Link>
        </div>
        {this.renderUserDetails()}
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
