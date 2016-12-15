import React from 'react';
import { Field } from 'redux-form/immutable';
import InputDate from './InputDate';
import InputTime from './InputTime';

const dateStyle = {
  display: 'inline-block',
  width: '60%',
  marginRight: '5%',
};

const timeStyle = {
  display: 'inline-block',
  width: '35%',
};

const FilterDate = () => (
  <div>
    <Field
      name="date.from"
      label="From"
      component={InputDate}
      style={dateStyle}
    />
    <Field
      name="date.from"
      label="From"
      component={InputTime}
      style={timeStyle}
    />

    <Field
      name="date.to"
      label="To"
      component={InputDate}
      style={dateStyle}
    />
    <Field
      name="date.to"
      label="To"
      component={InputTime}
      style={timeStyle}
    />
  </div>
);

export default FilterDate;
