import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Map } from 'immutable';
import { selectUserRoleLabels } from '../selectors';
import ExpensesItem from '../Item';
import { createForm } from '../ItemForm';

class ItemRenderer extends PureComponent {
  render() {
    const { user, labels } = this.props;
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

export const mapStateToProps = createStructuredSelector({
  labels: selectUserRoleLabels(),
});

ItemRenderer.propTypes = {
  user: PropTypes.instanceOf(Map),
  labels: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, null)(ItemRenderer);
