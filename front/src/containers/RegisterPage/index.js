import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import InputEmail from 'components/InputEmail';
import InputPassword from 'components/InputPassword';
import InputSubmit from 'components/InputSubmit';
import { blue500 } from 'material-ui/styles/colors';
import validate from './validate';
import { submit } from './actions';

const style = {
  textAlign: 'center',
};

export const RegisterPage = ({ handleSubmit, error }) => (
  <form onSubmit={handleSubmit} style={style}>
    <h2 style={{ color: blue500 }}>Register</h2>
    <div>
      <Field
        component={InputEmail}
        name="email"
        label="Email"
      />
    </div>
    <div>
      <Field
        component={InputPassword}
        name="password"
        label="Password"
      />
    </div>
    <div>
      <Field
        component={InputPassword}
        name="passwordConfirm"
        label="Confirm Password"
      />
    </div>
    {error && <p>{error}</p>}
    <div>
      <Field
        component={InputSubmit}
        name="submit"
        label="Register"
      />
    </div>
  </form>
);

export const mapDispatchToProps = dispatch => ({
  onSubmit: values => new Promise((resolve, reject) => {
    dispatch(submit(values.merge({
      res: resolve,
      rej: reject,
    })));
  }),
});

RegisterPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'register',
  validate,
})(RegisterPage));
