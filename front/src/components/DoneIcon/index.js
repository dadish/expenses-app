import React, { PropTypes } from 'react';
import Icon from 'material-ui/svg-icons/action/done';
import { green400, green900 } from 'material-ui/styles/colors';

const DoneIcon = (props) => {
  const { onClick, style } = props;
  return (
    <Icon
      color={green400}
      hoverColor={green900}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        ...style,
      }}
    />
  );
};

DoneIcon.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default DoneIcon;
