import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { reduxForm, Field } from 'redux-form/immutable';
import UsersItemRow from 'components/UsersItemRow';
import {
  UsersItemColumnId,
  UsersItemColumnEmail,
  UsersItemColumnRole,
  UsersItemColumnEdit,
} from 'components/UsersItemColumn';
import InputEmail from 'components/InputEmail';
import InputText from 'components/InputText';
import InputSelect from 'components/InputSelect';
import ActionIcons from './ActionIcons';

const fieldStyle = {
  width: '100%',
};

const UsersItemForm = ({ handleSubmit, initialValues, userRoleLabels }) => (
  <UsersItemRow>
    <UsersItemColumnId>
      <Field
        name="id"
        component={InputText}
        disabled
        style={fieldStyle}
      />
    </UsersItemColumnId>
    <UsersItemColumnEmail>
      <Field
        name="email"
        component={InputEmail}
        autofocus
        style={fieldStyle}
      />
    </UsersItemColumnEmail>
    <UsersItemColumnRole>
      <Field
        name="role"
        component={InputSelect}
        choices={userRoleLabels}
      />
    </UsersItemColumnRole>
    <UsersItemColumnEdit>
      <ActionIcons saving={initialValues.get('saving')} handleSubmit={handleSubmit} />
    </UsersItemColumnEdit>
  </UsersItemRow>
);

UsersItemForm.propTypes = {
  userRoleLabels: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.instanceOf(Map).isRequired,
};

export const createForm = form => reduxForm({ form })(UsersItemForm);

export default UsersItemForm;
