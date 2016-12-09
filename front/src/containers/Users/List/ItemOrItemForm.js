import React, { PropTypes, PureComponent } from 'react';
import { Map } from 'immutable';
import ExpensesItem from '../Item';
import { createForm } from '../ItemForm';

const labels = [
  [100, 'User'],
  [200, 'Manager'],
  [300, 'Admin'],
];

class ItemRenderer extends PureComponent {
  render() {
    const { user } = this.props;
    let item;
    if (user.get('edit')) {
      const Form = createForm(user.get('cid'));
      item = (<Form initialValues={user} userRoleLabels={labels} />);
    } else {
      item = (<ExpensesItem user={user} userRoleLabels={labels} />);
    }
    return item;
  }
}

ItemRenderer.propTypes = {
  user: PropTypes.instanceOf(Map),
};

export default ItemRenderer;
