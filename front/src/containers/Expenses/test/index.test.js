import React from 'react';
import { shallow } from 'enzyme';
import { Expenses } from '../';

const props = {
  filterOn: false,
  filterUpdating: false,
};

test('Expenses renders without errors with filterOn=false&filterUpdating=false', () => {
  shallow(<Expenses {...props} />);
});

test('Expenses renders without errors with filterOn=true&filterUpdating=true', () => {
  const newProps = {
    ...props,
    filterOn: true,
    filterUpdating: true,
  };
  shallow(<Expenses {...newProps} />);
});
