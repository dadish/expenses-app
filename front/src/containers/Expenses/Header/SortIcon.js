import React, { PropTypes } from 'react';
import DescendingIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import AscendingIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';
import { grey300, blue300, blue700 } from 'material-ui/styles/colors';
import { SORT_DIRECTION_DESC } from './constants';

const Icon = ({ direction, isActive }) => {
  const color = isActive ? blue300 : grey300;
  if (direction === SORT_DIRECTION_DESC || !isActive) {
    return (
      <DescendingIcon
        color={color}
        hoverColor={blue700}
      />
    );
  }
  return (
    <AscendingIcon
      color={color}
      hoverColor={blue700}
    />
  );
};

Icon.propTypes = {
  direction: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Icon;
