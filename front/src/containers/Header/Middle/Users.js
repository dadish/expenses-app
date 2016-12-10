import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { blue500, blue700 } from 'material-ui/styles/colors';

const Users = ({ handleClick }) => (
  <FlatButton
    label="Users"
    hoverColor={blue500}
    rippleColor={blue700}
    onClick={handleClick}
    labelStyle={{ color: '#fff' }}
  />
);

Users.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Users;
