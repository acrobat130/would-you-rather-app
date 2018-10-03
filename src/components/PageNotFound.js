import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PageNotFound extends Component {
  render() {
    return (
      <div>
        <p className="no-margin">We couldn't find the page you're looking for.</p>
        <p>Try going back to the <Link to="/" className="link">dashboard</Link></p>
      </div>
    );
  }
}
