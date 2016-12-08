/*
 * LoginPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { blue400 } from 'material-ui/styles/colors';
import { Field, reduxForm } from 'redux-form/immutable';
import InputEmail from 'components/InputEmail';
import InputPassword from 'components/InputPassword';
import InputSubmit from 'components/InputSubmit';
import { submit, cookieLogin } from './actions';
import validate from './validate';
import {
  FORM_NAME,
  FORM_FIELD_EMAIL,
  FORM_FIELD_PASSWORD,
  FORM_FIELD_SUBMIT,
} from './constants';

export const LoginPage = ({ handleSubmit, error }) => (
  <form
    onSubmit={handleSubmit}
    style={{
      textAlign: 'center',
      marginTop: '32px',
    }}
  >
    <div>
      <Field
        component={InputEmail}
        name={FORM_FIELD_EMAIL}
        label="Email"
      />
    </div>
    <div>
      <Field
        component={InputPassword}
        name={FORM_FIELD_PASSWORD}
        label="Password"
      />
    </div>
    {error && <p>{error}</p>}
    <div>
      <Field
        component={InputSubmit}
        name={FORM_FIELD_SUBMIT}
        label="Login"
      />
    </div>
    <Link style={{ color: blue400 }} to="/register"> Register</Link>
  </form>
);

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export const mapDispatchToProps = (dispatch, props) => ({
  onSubmit: values => new Promise((resolve, reject) => {
    dispatch(submit(values.merge({
      res: resolve,
      rej: reject,
      nextPathname: props.location.state.nextPathname,
    })));
  }),
  onCookieLogin: dispatch(cookieLogin(props.location.state.nextPathname)),
});

// Wrap the component with reduxForm
export default connect(null, mapDispatchToProps)(reduxForm({
  form: FORM_NAME,
  validate,
})(LoginPage));
