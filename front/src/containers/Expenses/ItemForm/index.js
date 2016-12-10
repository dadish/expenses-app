import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { reduxForm, Field } from 'redux-form/immutable';
import ExpensesItemRow from 'components/ExpensesItemRow';
import {
  ExpensesItemColumnId,
  ExpensesItemColumnEmail,
  ExpensesItemColumnRole,
  ExpensesItemColumnEdit,
} from 'components/ExpensesItemColumn';
import InputEmail from 'components/InputEmail';
import InputText from 'components/InputText';
import InputSelect from 'components/InputSelect';
import ActionIcons from './ActionIcons';

const fieldStyle = {
  width: '100%',
};

const ExpensesItemForm = ({ handleSubmit, initialValues, expenseRoleLabels }) => (
  <ExpensesItemRow>
    <ExpensesItemColumnId>
      <Field
        name="id"
        component={InputText}
        disabled
        style={fieldStyle}
      />
    </ExpensesItemColumnId>
    <ExpensesItemColumnEmail>
      <Field
        name="email"
        component={InputEmail}
        autofocus
        style={fieldStyle}
      />
    </ExpensesItemColumnEmail>
    <ExpensesItemColumnRole>
      <Field
        name="role"
        component={InputSelect}
        choices={expenseRoleLabels}
      />
    </ExpensesItemColumnRole>
    <ExpensesItemColumnEdit>
      <ActionIcons expense={initialValues} handleSubmit={handleSubmit} />
    </ExpensesItemColumnEdit>
  </ExpensesItemRow>
);

ExpensesItemForm.propTypes = {
  expenseRoleLabels: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.instanceOf(Map).isRequired,
};

export const createForm = form => reduxForm({ form })(ExpensesItemForm);

export default ExpensesItemForm;
