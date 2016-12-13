import React from 'react';
import { shallow } from 'enzyme';
import { create } from '../Item/actions';
import { toggleFilter } from '../Filter/actions';
import { ExpensesControls, mapDispatchToProps } from './';

const props = {
  handleAdd: () => {},
  handleFilter: () => {},
};

test('it renders without errors', () => {
  shallow(<ExpensesControls {...props} />);
});

describe('mapDispatchToProps()', () => {
  const dispatch = jest.fn();
  const { handleAdd, handleFilter } = mapDispatchToProps(dispatch);
  it('produces a handleAdd() method that dispatches a create({ edit: true }) action', () => {
    handleAdd();
    expect(dispatch.mock.calls[0][0]).toEqual(create({ edit: true }));
  });

  it('produces a handleAdd() method that dispatches a toggleFilter action creator', () => {
    handleFilter();
    expect(dispatch.mock.calls[1][0]).toEqual(toggleFilter());
  });
});
