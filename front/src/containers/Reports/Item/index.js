import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Map } from 'immutable';
import ReportsItemRow from 'components/ReportsItemRow';
import {
  ReportsItemColumnPeriod,
  ReportsItemColumnAvarageSpent,
  ReportsItemColumnTotalSpent,
} from 'components/ReportsItemColumn';
import { selectPeriod } from './selectors';

export const ReportItem = ({ report, period }) => (
  <ReportsItemRow>
    <ReportsItemColumnPeriod>
      {period}
    </ReportsItemColumnPeriod>
    <ReportsItemColumnAvarageSpent>
      ${Math.ceil(report.get('totalSpent') / 7) / 100}
    </ReportsItemColumnAvarageSpent>
    <ReportsItemColumnTotalSpent>
      ${report.get('totalSpent') / 100}
    </ReportsItemColumnTotalSpent>
  </ReportsItemRow>
);

ReportItem.propTypes = {
  report: PropTypes.instanceOf(Map).isRequired,
  period: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  period: selectPeriod(),
});

export default connect(mapStateToProps)(ReportItem);
