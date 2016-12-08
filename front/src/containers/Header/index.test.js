import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import { push } from 'react-router-redux';
import { logout } from 'containers/App/actions';
import { Header, mapDispatchToProps } from './';

const props = {
  handleLogout: () => {},
  goToRuns: () => {},
  goToUsers: () => {},
};

test('Header renders without errors', () => {
  shallow(<Header {...props} />);
});

describe('mapDispatchToProps()', () => {
  const dispatch = createSpy();
  const { handleLogout, goToRuns, goToUsers } = mapDispatchToProps(dispatch);

  it('handleLogout() dispatches a logout action', () => {
    handleLogout();
    expect(dispatch).toHaveBeenCalledWith(logout());
  });

  it('goToRuns() dispatches a react-router-redux`s push with `/runs`', () => {
    goToRuns();
    expect(dispatch).toHaveBeenCalledWith(push('/runs'));
  });

  it('goToUsers() dispatches a react-router-redux`s push with `/users`', () => {
    goToUsers();
    expect(dispatch).toHaveBeenCalledWith(push('/users'));
  });
});
