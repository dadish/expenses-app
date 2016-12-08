/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export const HomePage = () => (
  <div>
    <h1>HomePage</h1>
    <Link to="/login">Login</Link>
  </div>
);

// Wrap the component to inject dispatch and state into it
export default connect(null, null)(HomePage);
