import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import { create } from '../Item/actions';
import { ExpensesControls, mapDispatchToProps } from './';

const props = {
  handleAdd: () => {},
};

test('it renders without errors', () => {
  shallow(<ExpensesControls {...props} />);
});

describe('mapDispatchToProps()', () => {
  const returnObject = {};
  const dispatch = createSpy().andReturn(returnObject);
  const { handleAdd } = mapDispatchToProps(dispatch);
  it('produces a handleAdd() method that dispatches a create action creator', () => {
    const action = create({ edit: true }); // we set edit to true when created via ADD button
    expect(handleAdd()).toEqual(returnObject);
    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
