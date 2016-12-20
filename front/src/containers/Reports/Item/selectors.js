import { createSelector } from 'reselect';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';

const selectReport = () => (state, props) => props.report;

const selectWeekStart = () => createSelector(
  selectReport(),
  report => report.get('weekStart'),
);

export const selectPeriod = () => createSelector(
  selectWeekStart(),
  (weekStart) => {
    let period = '';
    period += `${format(weekStart, 'YYYY MMM D')}`;
    period += ' - ';
    period += `${format(addDays(weekStart, 6), 'D')}`;
    return period;
  }
);
