import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import { push } from 'react-router-redux';
import { logout } from 'containers/App/actions';
import { Header, mapDispatchToProps } from './';

const pathname = 'string';

const props = {
  handleLogout: () => {},
  goToExpenses: () => {},
  goToUsers: () => {},
  goToReports: () => {},
  location: { pathname },
  userRole: 200,
};

describe('Header', () => {
  it('renders without errors with role=100', () => {
    shallow(<Header {...props} userRole={100} />);
  });
  it('renders without errors with role=200', () => {
    shallow(<Header {...props} />);
  });
  it('renders without errors with role=0', () => {
    shallow(<Header {...props} userRole={0} />);
  });
});

describe('mapDispatchToProps()', () => {
  const dispatch = createSpy();
  const { handleLogout, goToExpenses, goToUsers, goToReports } = mapDispatchToProps(dispatch);

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
  it('goToReports() dispatches a react-router-redux`s push with `/users`', () => {
    goToReports();
    expect(dispatch).toHaveBeenCalledWith(push('/reports'));
  });
});
