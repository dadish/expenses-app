import { createSelector } from 'reselect';
import rootSelector from '../selectors';

const selectList = () => createSelector(
  rootSelector(),
  expenses => expenses.get('list'),
);

export default selectList;
