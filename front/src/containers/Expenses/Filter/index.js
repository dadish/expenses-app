import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { selectUserRole } from 'containers/App/selectors';
import { selectColumnWidths } from 'containers/Expenses/selectors';
import ExpensesItemRow from 'components/ExpensesItemRow';
import { grey200 } from 'material-ui/styles/colors';
import {
  ExpensesItemColumnId,
  ExpensesItemColumnUser,
  ExpensesItemColumnAmount,
  ExpensesItemColumnDate,
  ExpensesItemColumnComment,
  ExpensesItemColumnDescription,
  ExpensesItemColumnEdit,
} from 'components/ExpensesItemColumn';
import InputText from 'components/InputText';
import CancelIcon from 'components/CancelIcon';
import FilterAmount from './FilterAmount';
import FilterDate from './FilterDate';
import { FORM_NAME } from './constants';

const fieldStyle = {
  width: '100%',
};

export const ExpensesFilter = (props) => {
  const {
    role,
    widths,
    dirty,
    handleCancelClick,
  } = props;

  const clearButton = (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CancelIcon
        onClick={handleCancelClick}
      />
    </div>
  );

  const columns = [];

  columns.push(
    <ExpensesItemColumnId key="id" width={widths.id} />
  );

  if (role === 300) {
    columns.push(
      <ExpensesItemColumnUser key="user" width={widths.user} >
        <Field
          name="userEmail"
          component={InputText}
          style={fieldStyle}
          autofocus
        />
      </ExpensesItemColumnUser>
    );
  }

  columns.push(
    <ExpensesItemColumnAmount key="amount" width={widths.amount} >
      <FilterAmount />
    </ExpensesItemColumnAmount>
  );
  columns.push(
    <ExpensesItemColumnDate key="date" width={widths.date} >
      <FilterDate />
    </ExpensesItemColumnDate>
  );
  columns.push(
    <ExpensesItemColumnComment key="comment" width={widths.comment} >
      <Field
        name="comment"
        component={InputText}
        style={fieldStyle}
      />
    </ExpensesItemColumnComment>
  );
  columns.push(
    <ExpensesItemColumnDescription key="description" width={widths.description} >
      <Field
        name="description"
        component={InputText}
        style={fieldStyle}
      />
    </ExpensesItemColumnDescription>
  );
  columns.push(
    <ExpensesItemColumnEdit key="edit" width={widths.edit}>
      {dirty && clearButton}
    </ExpensesItemColumnEdit>
      );

  return (
    <ExpensesItemRow
      style={{
        borderBottom: 'none',
        borderTop: `1px solid ${grey200}`,
      }}
    >
      {columns}
    </ExpensesItemRow>
  );
};

export const mapStateToProps = createStructuredSelector({
  role: selectUserRole(),
  widths: selectColumnWidths(),
});

export const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(reset(FORM_NAME)),
});

ExpensesFilter.propTypes = {
  role: PropTypes.number.isRequired,
  dirty: PropTypes.bool.isRequired,
  widths: PropTypes.object.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FORM_NAME,
  initialValues: fromJS({
    userEmail: null,
    amount: {
      min: null,
      max: null,
    },
    date: {
      from: null,
      to: null,
    },
    comment: null,
    description: null,
  }),
})(ExpensesFilter));
