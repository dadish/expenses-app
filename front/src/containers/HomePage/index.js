/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';

export const HomePage = () => (
  <div
    style={{
      textAlign: 'center',
    }}
  >
    <h1>HomePage</h1>
  </div>
);

// Wrap the component to inject dispatch and state into it
export default connect(null, null)(HomePage);
