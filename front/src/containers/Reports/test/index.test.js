import React from 'react';
import { shallow } from 'enzyme';
import { Reports } from '../';

const props = {
  filterOn: false,
  listUpdating: false,
};

test('Reports renders without errors with filterOn=false&listUpdating=false', () => {
  shallow(<Reports {...props} />);
});

test('Reports renders without errors with filterOn=true&listUpdating=true', () => {
  const newProps = {
    ...props,
    filterOn: true,
    listUpdating: true,
  };
  shallow(<Reports {...newProps} />);
});
