import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from '../utils/lodash';
import Table from './Table';

const tableColumns = [
  {
    value: 'Rank',
    id: 'rank'
  },
  {
    value: 'Avatar',
    id: 'avatar'
  },
  {
    value: 'Name',
    id: 'name'
  },
  {
    value: 'Questions Submitted',
    id: 'questionsSubmitted'
  },
  {
    value: 'Questions Answered',
    id: 'questionsAnswered'
  },
  {
    value: 'Total Points',
    id: 'totalPoints'
  }
];

// users object
function addPointsToUsers(users) {
  return _.map(users, (user) => {
    const { answers, questions } = user;
    const questionsSubmitted = questions.length;
    const questionsAnswered = Object.keys(answers).length;
    const totalPoints = questionsSubmitted + questionsAnswered;

    return {
      ...user,
      questionsSubmitted,
      questionsAnswered,
      totalPoints
    };
  });
}

// users array
function sortUsers(users) {
  return users.sort((user1, user2) => {
    return user1.totalPoints < user2.totalPoints;
  });
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

class Leaderboard extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired
  };

  getUserData = () => {
    const usersWithPoints = addPointsToUsers(this.props.users);
    const sortedUsers = sortUsers(usersWithPoints);

    return sortedUsers.map((user, index) => {
      const {
        avatarURL,
        id,
        name,
        questionsSubmitted,
        questionsAnswered,
        totalPoints
      } = user;

      return {
        key: id,
        rowData: {
          rank: index + 1,
          name,
          questionsSubmitted,
          questionsAnswered,
          totalPoints,
          avatar: <img src={avatarURL} className="image" alt="avatar" />
        }
      };
    });
  };

  render() {
    const userData = this.getUserData();

    return (
      <div>
        <h2>Leaderboard</h2>
        <Table columns={tableColumns} data={userData} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Leaderboard);
