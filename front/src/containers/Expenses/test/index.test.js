import React from 'react';
import { shallow } from 'enzyme';
import { Expenses } from '../';

const props = {
  filterOn: false,
  listUpdating: false,
};

test('Expenses renders without errors with filterOn=false&listUpdating=false', () => {
  shallow(<Expenses {...props} />);
});

test('Expenses renders without errors with filterOn=true&listUpdating=true', () => {
  const newProps = {
    ...props,
    filterOn: true,
    listUpdating: true,
  };
  shallow(<Expenses {...newProps} />);
});
