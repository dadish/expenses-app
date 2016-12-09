import { createSelector } from 'reselect';
import rootSelector from '../selectors';

const selectList = () => createSelector(
  rootSelector(),
  users => users.get('list'),
);

export default selectList;
