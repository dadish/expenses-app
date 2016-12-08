import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { blue400, blue500, blue700 } from 'material-ui/styles/colors';
import Logo from 'components/Logo';
import { logout } from 'containers/App/actions';


export const Header = ({ handleLogout, goToRuns, goToUsers }) => (
  <Paper
    style={{
      backgroundColor: blue400,
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px',
    }}
  >
    <Logo />
    <div>
      <FlatButton
        label="Expenses"
        hoverColor={blue500}
        rippleColor={blue700}
        onClick={goToRuns}
        labelStyle={{ color: '#fff' }}
      />
      <FlatButton
        label="Users"
        hoverColor={blue500}
        rippleColor={blue700}
        onClick={goToUsers}
        labelStyle={{ color: '#fff' }}
      />
    </div>
    <FlatButton
      label="Logout"
      onClick={handleLogout}
      hoverColor={blue500}
      rippleColor={blue700}
      labelStyle={{ color: '#fff' }}
    />
  </Paper>
);

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  goToRuns: PropTypes.func.isRequired,
  goToUsers: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logout()),
  goToRuns: () => dispatch(push('/runs')),
  goToUsers: () => dispatch(push('/users')),
});

export default connect(null, mapDispatchToProps)(Header);
