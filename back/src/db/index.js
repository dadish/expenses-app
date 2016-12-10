import knex from './knex';
import { sync } from './table';

import User from './models/User';
import Expense from './models/Expense';

export { User, Expense, sync };

export default knex;
