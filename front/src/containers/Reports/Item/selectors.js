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
  (startDate) => {
    let period = '';
    const startYear = format(startDate, 'YYYY');
    const startMonth = format(startDate, 'MMM');
    const startDay = format(startDate, 'D');
    const endDate = addDays(startDate, 6);
    const endYear = format(endDate, 'YYYY');
    const endMonth = format(endDate, 'MMM');
    const endDay = format(endDate, 'D');
    period += `${startYear} ${startMonth} ${startDay}`;
    period += ' -';
    if (startYear !== endYear) period += ` ${endYear}`;
    if (startMonth !== endMonth) period += ` ${endMonth}`;
    period += ` ${endDay}`;
    return period;
  }
);
