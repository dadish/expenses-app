import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { grey200 } from 'material-ui/styles/colors';
import { createStructuredSelector } from 'reselect';
import { selectUserRole } from 'containers/App/selectors';
import { selectColumnWidths } from 'containers/Expenses/selectors';
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
import SortableLabel from './SortableLabel';

export const ExpensesHeader = ({ role, widths }) => {
  const columns = [];
  columns.push(
    <ExpensesItemColumnId key="id" width={widths.id} >
      Id
    </ExpensesItemColumnId>
  );

  if (role === 300) {
    columns.push(
      <ExpensesItemColumnUser key="user" width={widths.user} >
        <SortableLabel field="user">User</SortableLabel>
      </ExpensesItemColumnUser>
    );
  }

  columns.push(
    <ExpensesItemColumnAmount key="amount" width={widths.amount} >
      <SortableLabel field="amount">Amount</SortableLabel>
    </ExpensesItemColumnAmount>
  );
  columns.push(
    <ExpensesItemColumnDate key="date" width={widths.date} >
      <SortableLabel field="date">Date</SortableLabel>
    </ExpensesItemColumnDate>
  );
  columns.push(
    <ExpensesItemColumnComment key="comment" width={widths.comment} >
      <SortableLabel field="comment">Comment</SortableLabel>
    </ExpensesItemColumnComment>
  );
  columns.push(
    <ExpensesItemColumnDescription key="description" width={widths.description} >
      <SortableLabel field="description">Description</SortableLabel>
    </ExpensesItemColumnDescription>
  );
  columns.push(
    <ExpensesItemColumnEdit key="edit" width={widths.edit} >
      Edit
    </ExpensesItemColumnEdit>
  );

  return (
    <ExpensesItemRow
      style={{
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

ExpensesHeader.propTypes = {
  role: PropTypes.number.isRequired,
  widths: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ExpensesHeader);
