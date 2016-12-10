import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Paper from 'material-ui/Paper';
import { blue400 } from 'material-ui/styles/colors';
import Logo from 'components/Logo';
import { logout } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { selectUserRole } from 'containers/App/selectors';
import Expenses from './Middle/Expenses';
import Users from './Middle/Users';
import Logout from './Logout';

const style = {
  backgroundColor: blue400,
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px',
};

export const Header = (props) => {
  const {
    handleLogout,
    goToExpenses,
    goToUsers,
    userRole,
  } = props;
  const headerItems = [];
  const headerMiddleItems = [];
  const headerLogo = (
    <Logo
      key="header-logo"
    />
  );
  const headerMiddleExpenses = (
    <Expenses
      key="header-middle-expenses"
      handleClick={goToExpenses}
    />
  );
  const headerMiddleUsers = (
    <Users
      key="header-middle-users"
      handleClick={goToUsers}
    />
  );
  const headerLogout = (
    <Logout
      key="header-logout
      " handleClick={handleLogout}
    />
  );

  headerItems.push(headerLogo);
  if (userRole >= 100) headerMiddleItems.push(headerMiddleExpenses);
  if (userRole >= 200) headerMiddleItems.push(headerMiddleUsers);
  headerItems.push(<div key="header-middle">{headerMiddleItems}</div>);
  if (userRole >= 100) headerItems.push(headerLogout);

  return (
    <Paper style={style} >
      {headerItems}
    </Paper>
  );
};

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  goToExpenses: PropTypes.func.isRequired,
  goToUsers: PropTypes.func.isRequired,
  userRole: PropTypes.number.isRequired,
};

export const mapStateToProps = createStructuredSelector({
  userRole: selectUserRole(),
});

export const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logout()),
  goToExpenses: () => dispatch(push('/expenses')),
  goToUsers: () => dispatch(push('/users')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
