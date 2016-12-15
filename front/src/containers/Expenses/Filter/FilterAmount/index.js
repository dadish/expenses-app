import React from 'react';
import isNaN from 'lodash/isNaN';
import { Field } from 'redux-form/immutable';
import InputText from 'components/InputText';

const fieldStyle = {
  width: '100%',
};

export const normalizeAmount = (value) => {
  let result = Number(value);
  if (isNaN(result)) result = 0;
  return result;
};

const FilterAmount = () => (
  <div>
    <Field
      label="Min"
      type="number"
      name="amount.min"
      style={fieldStyle}
      component={InputText}
      normalize={normalizeAmount}
      parse={normalizeAmount}
    />
    <Field
      label="Max"
      type="number"
      name="amount.max"
      style={fieldStyle}
      component={InputText}
      normalize={normalizeAmount}
      parse={normalizeAmount}
    />
  </div>
);

export default FilterAmount;
