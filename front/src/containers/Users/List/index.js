import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { createStructuredSelector } from 'reselect';
import selectList from './selectors';
import ItemOrItemForm from './ItemOrItemForm';

export const UsersList = ({ list }) => (
  <div>
    {list.map(user => <ItemOrItemForm user={user} key={user.get('cid')} />)}
  </div>
);

UsersList.propTypes = {
  list: PropTypes.instanceOf(List),
};

export const mapStateToProps = createStructuredSelector({
  list: selectList(),
});

export default connect(mapStateToProps, null)(UsersList);
