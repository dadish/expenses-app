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
    const cid = expense.get('cid');
    let item;
    if (expense.get('edit')) {
      let values;
      if (expense.get('id')) {
        values = expense;
      } else {
        values = expense.merge({
          user: user.get('id'),
          userEmail: user.get('email'),
        });
      }
      const Form = createForm(cid);
      item = (<Form initialValues={values} cid={cid} />);
    } else {
      item = (<Item expense={expense} />);
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
