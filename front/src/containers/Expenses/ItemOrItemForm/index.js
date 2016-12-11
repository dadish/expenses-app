import React, { PropTypes, PureComponent } from 'react';
import { Map } from 'immutable';
import Item from '../Item';
import { createForm } from '../ItemForm';

export class ItemOrItemForm extends PureComponent {
  render() {
    const { expense } = this.props;
    let item;
    if (expense.get('edit')) {
      const Form = createForm(expense.get('cid'));
      item = (<Form initialValues={expense} />);
    } else {
      item = (<Item expense={expense} />);
    }
    return item;
  }
}

ItemOrItemForm.propTypes = {
  expense: PropTypes.instanceOf(Map),
};

export default ItemOrItemForm;
