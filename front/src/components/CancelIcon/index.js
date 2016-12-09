import React, { PropTypes } from 'react';
import Icon from 'material-ui/svg-icons/content/clear';
import { red400, red900 } from 'material-ui/styles/colors';

const CancelIcon = ({ onClick, style }) => (
  <Icon
    color={red400}
    hoverColor={red900}
    onClick={onClick}
    style={{
      cursor: 'pointer',
      ...style,
    }}
  />
);

CancelIcon.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default CancelIcon;
