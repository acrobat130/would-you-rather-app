import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { setAuthedUserId } from '../actions/authedUserId';

function mapStateToProps({ authedUserId, users }) {
  return {
    authedUserId,
    users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUserId: (userId) => dispatch(setAuthedUserId(userId))
  };
}

class Nav extends Component {
  static propTypes = {
    authedUserId: PropTypes.string.isRequired,
    setAuthedUserId: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
  };

  handleLogout = (e) => {
    e.preventDefault();

    this.props.setAuthedUserId('');
  };

  renderLogoutButton = () => {
    const { authedUserId } = this.props;

    return (
      <form onSubmit={this.handleLogout}>
        <button
          className="button--inverse"
          type="submit"
          disabled={!authedUserId}
        >
          Logout
        </button>
      </form>
    );
  };

  renderUserDetails = () => {
    const { authedUserId, users } = this.props;
    const user = users[authedUserId];
    const { name, avatarURL } = user;

    return (
      <div className="nav-items-group">
        <img className="image" src={avatarURL} alt="avatar" />
        <p>{name}</p>
        {this.renderLogoutButton()}
      </div>
    );
  };

  render() {
    const { authedUserId } = this.props;

    if (!authedUserId) {
      return null;
    }

    return (
      <nav>
        <div className="nav-items-group">
          <NavLink exact to="/" className="tab">
            Dashboard
          </NavLink>
          <NavLink to="/leaderboard" className="tab">
            Leaderboard
          </NavLink>
          <NavLink to="/add" className="tab">
            New Poll
          </NavLink>
        </div>
        {this.renderUserDetails()}
      </nav>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nav)
);
