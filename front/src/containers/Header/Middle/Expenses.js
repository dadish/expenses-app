import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { blue500, blue700 } from 'material-ui/styles/colors';

const Expenses = ({ handleClick }) => (
  <FlatButton
    label="Expenses"
    hoverColor={blue500}
    rippleColor={blue700}
    onClick={handleClick}
    labelStyle={{ color: '#fff' }}
  />
);

Expenses.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Expenses;
