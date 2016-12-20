import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { blue500, blue700 } from 'material-ui/styles/colors';

const HeaderButton = ({ handleClick, label }) => (
  <FlatButton
    label={label}
    hoverColor={blue500}
    rippleColor={blue700}
    onClick={handleClick}
    labelStyle={{ color: '#fff' }}
  />
);

HeaderButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default HeaderButton;
