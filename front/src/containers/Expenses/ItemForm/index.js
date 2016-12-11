import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
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
import { selectUser } from 'containers/App/selectors';
import { selectColumnWidths } from 'containers/Expenses/selectors';
import { createStructuredSelector } from 'reselect';

import ActionIcons from './ActionIcons';

const fieldStyle = {
  width: '100%',
};

const ExpensesItemForm = (props) => {
  const {
    handleSubmit,
    initialValues,
    user,
    widths,
  } = props;
  const fields = [];

  fields.push(
    <ExpensesItemColumnId key="id" width={widths.id} >
      <Field
        name="id"
        component={InputText}
        disabled
        style={fieldStyle}
      />
    </ExpensesItemColumnId>
  );
  if (user.get('role') === 300) {
    fields.push(
      <ExpensesItemColumnUser key="user" width={widths.user} >
        <Field
          name="userEmail"
          component={InputEmail}
          style={fieldStyle}
        />
      </ExpensesItemColumnUser>
    );
  }
  fields.push(
    <ExpensesItemColumnAmount key="amount" width={widths.amount} >
      <Field
        name="amount"
        component={InputText}
        style={fieldStyle}
      />
    </ExpensesItemColumnAmount>
  );
  fields.push(
    <ExpensesItemColumnDate key="date" width={widths.date} >
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
  );
  fields.push(
    <ExpensesItemColumnComment key="comment" width={widths.comment} >
      <Field
        name="comment"
        component={InputTextarea}
        style={fieldStyle}
      />
    </ExpensesItemColumnComment>
  );
  fields.push(
    <ExpensesItemColumnDescription key="description" width={widths.description} >
      <Field
        name="description"
        component={InputTextarea}
        style={fieldStyle}
      />
    </ExpensesItemColumnDescription>
  );
  fields.push(
    <ExpensesItemColumnEdit key="edit" width={widths.edit} >
      <ActionIcons expense={initialValues} handleSubmit={handleSubmit} />
    </ExpensesItemColumnEdit>
  );

  return (
    <ExpensesItemRow>
      {fields}
    </ExpensesItemRow>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  widths: selectColumnWidths(),
});

ExpensesItemForm.propTypes = {
  user: PropTypes.instanceOf(Map).isRequired,
  widths: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.instanceOf(Map).isRequired,
};

export const createForm = form => connect(
  mapStateToProps,
)(reduxForm({ form })(ExpensesItemForm));

export default ExpensesItemForm;
