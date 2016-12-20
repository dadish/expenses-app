import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import ReportsItemRow from 'components/ReportsItemRow';
import {
  ReportsItemColumnPeriod,
  ReportsItemColumnAvarageSpent,
  ReportsItemColumnTotalSpent,
} from 'components/ReportsItemColumn';

export const ReportItem = ({ report }) => (
  <ReportsItemRow>
    <ReportsItemColumnPeriod>
      {format(report.get('weekStart'), 'YYYY MMM D')} - {format(addDays(report.get('weekStart'), 6), 'D')}
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
};

export default ReportItem;
