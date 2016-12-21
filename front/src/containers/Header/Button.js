import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { blue500, blue700 } from 'material-ui/styles/colors';

const HeaderButton = ({ handleClick, label, active }) => (
  <FlatButton
    label={label}
    backgroundColor={active ? '#fff' : ''}
    labelStyle={{ color: active ? blue500 : '#fff' }}
    hoverColor={active ? '#fff' : blue500}
    rippleColor={blue700}
    onClick={handleClick}
  />
);

HeaderButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default HeaderButton;
