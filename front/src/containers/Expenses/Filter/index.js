import toNumber from 'lodash/toNumber';
import isNaN from 'lodash/isNaN';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { selectUserRole } from 'containers/App/selectors';
import { selectColumnWidths } from 'containers/Expenses/selectors';
import { grey300 } from 'material-ui/styles/colors';
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
import { FORM_NAME } from './constants';

const fieldStyle = {
  width: '100%',
  borderBottom: `1px solid ${grey300}`,
};

export const normalizeAmount = (value) => {
  const number = toNumber(value);
  if (isNaN(number)) return 0;
  return number;
};

export const ExpensesFilter = ({ role, widths }) => {
  const columns = [];
  columns.push(
    <ExpensesItemColumnId key="id" width={widths.id} />
  );

  if (role === 300) {
    columns.push(
      <ExpensesItemColumnUser key="user" width={widths.user} >
        <Field
          name="user"
          component="input"
          style={fieldStyle}
          autoFocus
        />
      </ExpensesItemColumnUser>
    );
  }

  columns.push(
    <ExpensesItemColumnAmount key="amount" width={widths.amount} >
      <Field
        name="amount.min"
        component="input"
        style={fieldStyle}
        placeholder="min"
        normalize={normalizeAmount}
      />
      <Field
        name="amount.max"
        component="input"
        style={fieldStyle}
        placeholder="max"
        normalize={normalizeAmount}
      />
    </ExpensesItemColumnAmount>
  );
  columns.push(
    <ExpensesItemColumnDate key="date" width={widths.date} />
  );
  columns.push(
    <ExpensesItemColumnComment key="comment" width={widths.comment} >
      <Field
        name="comment"
        component="input"
        style={fieldStyle}
      />
    </ExpensesItemColumnComment>
  );
  columns.push(
    <ExpensesItemColumnDescription key="description" width={widths.description} >
      <Field
        name="description"
        component="input"
        style={fieldStyle}
      />
    </ExpensesItemColumnDescription>
  );
  columns.push(
    <ExpensesItemColumnEdit key="edit" width={widths.edit} />
  );

  return (
    <ExpensesItemRow>
      {columns}
    </ExpensesItemRow>
  );
};

export const mapStateToProps = createStructuredSelector({
  role: selectUserRole(),
  widths: selectColumnWidths(),
});

ExpensesFilter.propTypes = {
  role: PropTypes.number.isRequired,
  widths: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(reduxForm({ form: FORM_NAME })(ExpensesFilter));
