import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { blue500, blue700 } from 'material-ui/styles/colors';

const Logout = ({ handleClick }) => (
  <FlatButton
    key="header-logout"
    label="Logout"
    onClick={handleClick}
    hoverColor={blue500}
    rippleColor={blue700}
    labelStyle={{ color: '#fff' }}
  />
);

Logout.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Logout;
