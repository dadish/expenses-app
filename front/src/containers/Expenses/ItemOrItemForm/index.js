import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Map } from 'immutable';
import { selectExpenseRoleLabels } from '../selectors';
import ExpensesItem from '../Item';
import { createForm } from '../ItemForm';

export class ItemOrItemForm extends PureComponent {
  render() {
    const { expense, labels } = this.props;
    let item;
    if (expense.get('edit')) {
      const Form = createForm(expense.get('cid'));
      item = (<Form initialValues={expense} expenseRoleLabels={labels} />);
    } else {
      item = (<ExpensesItem expense={expense} expenseRoleLabels={labels} />);
    }
    return item;
  }
}

export const mapStateToProps = createStructuredSelector({
  labels: selectExpenseRoleLabels(),
});

ItemOrItemForm.propTypes = {
  expense: PropTypes.instanceOf(Map),
  labels: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, null)(ItemOrItemForm);
