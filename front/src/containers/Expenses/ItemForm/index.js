import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { reduxForm, Field } from 'redux-form/immutable';
import ExpensesItemRow from 'components/ExpensesItemRow';
import {
  ExpensesItemColumnId,
  ExpensesItemColumnUser,
  ExpensesItemColumnAmount,
  ExpensesItemColumnDate,
  ExpensesItemColumnComment,
  ExpensesItemColumnDescription,
  ExpensesItemColumnEdit,
} from 'components/ExpensesItemColumn';
import InputEmail from 'components/InputEmail';
import InputText from 'components/InputText';
import InputTextarea from 'components/InputTextarea';
import InputDate from 'components/InputDate';
import InputTime from 'components/InputTime';
import ActionIcons from './ActionIcons';

const fieldStyle = {
  width: '100%',
};

const ExpensesItemForm = ({ handleSubmit, initialValues }) => (
  <ExpensesItemRow>
    <ExpensesItemColumnId>
      <Field
        name="id"
        component={InputText}
        disabled
        style={fieldStyle}
      />
    </ExpensesItemColumnId>
    <ExpensesItemColumnUser>
      <Field
        name="userEmail"
        component={InputEmail}
        style={fieldStyle}
      />
    </ExpensesItemColumnUser>
    <ExpensesItemColumnAmount>
      <Field
        name="amount"
        component={InputText}
        style={fieldStyle}
      />
    </ExpensesItemColumnAmount>
    <ExpensesItemColumnDate>
      <Field
        name="date"
        component={InputDate}
        style={{
          width: '90px',
          display: 'inline-block',
          marginRight: '20px',
        }}
      />
      <Field
        name="date"
        component={InputTime}
        style={{
          width: '70px',
          display: 'inline-block',
        }}
      />
    </ExpensesItemColumnDate>
    <ExpensesItemColumnComment>
      <Field
        name="comment"
        component={InputTextarea}
        style={fieldStyle}
      />
    </ExpensesItemColumnComment>
    <ExpensesItemColumnDescription>
      <Field
        name="description"
        component={InputTextarea}
        style={fieldStyle}
      />
    </ExpensesItemColumnDescription>
    <ExpensesItemColumnEdit>
      <ActionIcons expense={initialValues} handleSubmit={handleSubmit} />
    </ExpensesItemColumnEdit>
  </ExpensesItemRow>
);

ExpensesItemForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.instanceOf(Map).isRequired,
};

export const createForm = form => reduxForm({ form })(ExpensesItemForm);

export default ExpensesItemForm;
