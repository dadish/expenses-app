import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { green400 } from 'material-ui/styles/colors';

const InProgress = () => (
  <div
    style={{
      margin: '32px',
      textAlign: 'center',
    }}
  >
    <CircularProgress
      size={32}
      thickness={3}
      color={green400}
    />
  </div>
);

export default InProgress;
