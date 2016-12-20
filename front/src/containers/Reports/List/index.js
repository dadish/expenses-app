import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { createStructuredSelector } from 'reselect';
import selectList from './selectors';
import Item from '../Item';

export const ReportList = ({ list }) => (
  <div>
    {list.map(report => <Item report={report} key={report.get('cid')} />)}
  </div>
);

ReportList.propTypes = {
  list: PropTypes.instanceOf(List),
};

export const mapStateToProps = createStructuredSelector({
  list: selectList(),
});

export default connect(mapStateToProps, null)(ReportList);
