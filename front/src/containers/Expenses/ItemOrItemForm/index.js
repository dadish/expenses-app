import React, { PropTypes, PureComponent } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Item from 'containers/Expenses/Item';
import { createForm } from 'containers/Expenses/ItemForm';
import { selectUser } from 'containers/App/selectors';

export class ItemOrItemForm extends PureComponent {
  render() {
    const { expense, user } = this.props;
    const values = user.get('role') === 300 ? expense : expense.set('user', user.get('id'));
    let item;
    if (expense.get('edit')) {
      const Form = createForm(expense.get('cid'));
      item = (<Form initialValues={values} />);
    } else {
      item = (<Item expense={values} />);
    }
    return item;
  }
}

export const mapStateToProps = createStructuredSelector({
  user: selectUser(),
});

ItemOrItemForm.propTypes = {
  expense: PropTypes.instanceOf(Map),
  user: PropTypes.instanceOf(Map),
};

export default connect(mapStateToProps)(ItemOrItemForm);
