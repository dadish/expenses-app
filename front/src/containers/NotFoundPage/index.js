/*
 * NotFoundPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';

const NotFoundPage = () => (
  <div
    style={{
      textAlign: 'center',
    }}
  >
    <h1>404</h1>
    <h2>Page Not Found</h2>
  </div>
);

// Wrap the component to inject dispatch and state into it
export default NotFoundPage;
