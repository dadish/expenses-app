import React from 'react';
import { shallow } from 'enzyme';
import { setCurrentPage, setItemsPerPage } from '../actions';
import { loadList } from '../List/actions';
import { ExpensesControls, mapDispatchToProps, printOnClick } from './';

const props = {
  handleAdd: () => {},
  handleLimitChange: () => {},
  handlePageChange: () => {},
  paginationData: {
    currentPage: 1,
    totalPages: 10,
  },
  itemsPerPage: 25,
};

test('it renders without errors', () => {
  shallow(<ExpensesControls {...props} />);
});

describe('mapDispatchToProps()', () => {
  const dispatch = jest.fn();
  const { handleLimitChange, handlePageChange } = mapDispatchToProps(dispatch);
  it('produces a handlePageChange() method that dispatches a setCurrentPage and loadList action creators', () => {
    const currentPage = 123453;
    handlePageChange(currentPage);
    expect(dispatch.mock.calls[0][0]).toEqual(setCurrentPage(currentPage));
    expect(dispatch.mock.calls[1][0]).toEqual(loadList());
  });

  it('produces a handleLimitChange() method that dispatches a setItemsPerPage and loadList action creators', () => {
    const itemsPerPage = 123;
    handleLimitChange(itemsPerPage);
    expect(dispatch.mock.calls[2][0]).toEqual(setItemsPerPage(itemsPerPage));
    expect(dispatch.mock.calls[3][0]).toEqual(loadList());
  });
});

test('printOnClick uses window print method', () => {
  printOnClick(); // should not throw errors
});
