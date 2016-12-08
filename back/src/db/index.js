import knex from './knex';
import { sync } from './table';

import User from './models/User';

export { User, sync };

export default knex;
