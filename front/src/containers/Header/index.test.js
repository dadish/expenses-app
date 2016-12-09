import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import { push } from 'react-router-redux';
import { logout } from 'containers/App/actions';
import { Header, mapDispatchToProps } from './';

const props = {
  handleLogout: () => {},
  goToExpenses: () => {},
  goToUsers: () => {},
};

test('Header renders without errors', () => {
  shallow(<Header {...props} />);
});

describe('mapDispatchToProps()', () => {
  const dispatch = createSpy();
  const { handleLogout, goToExpenses, goToUsers } = mapDispatchToProps(dispatch);

  it('handleLogout() dispatches a logout action', () => {
    handleLogout();
    expect(dispatch).toHaveBeenCalledWith(logout());
  });

  it('goToExpenses() dispatches a react-router-redux`s push with `/expenses`', () => {
    goToExpenses();
    expect(dispatch).toHaveBeenCalledWith(push('/expenses'));
  });

  it('goToUsers() dispatches a react-router-redux`s push with `/users`', () => {
    goToUsers();
    expect(dispatch).toHaveBeenCalledWith(push('/users'));
  });
});
