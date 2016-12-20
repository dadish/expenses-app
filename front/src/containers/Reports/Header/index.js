import React from 'react';
import { grey200 } from 'material-ui/styles/colors';
import ReportsItemRow from 'components/ReportsItemRow';
import {
  ReportsItemColumnPeriod,
  ReportsItemColumnAvarageSpent,
  ReportsItemColumnTotalSpent,
} from 'components/ReportsItemColumn';

export const ReportsHeader = () => (
  <ReportsItemRow
    style={{
      borderTop: `1px solid ${grey200}`,
    }}
  >
    <ReportsItemColumnPeriod>
      Period
    </ReportsItemColumnPeriod>
    <ReportsItemColumnAvarageSpent>
      Avarage Per Day
    </ReportsItemColumnAvarageSpent>
    <ReportsItemColumnTotalSpent>
      Total Spent
    </ReportsItemColumnTotalSpent>
  </ReportsItemRow>
);

export default ReportsHeader;
