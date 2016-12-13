import React from 'react';
import { shallow } from 'enzyme';
import { Expenses } from '../';

const props = {
  filterOn: false,
};

test('Expenses renders without errors with filterOn=false', () => {
  shallow(<Expenses {...props} />);
});

test('Expenses renders without errors with filterOn=true', () => {
  const newProps = {
    ...props,
    filterOn: true,
  };
  shallow(<Expenses {...newProps} />);
});
