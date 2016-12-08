import faker from 'faker';
import range from 'lodash/range';

export const generateAdminUsers = () => [{
  email: 'admin@expenses.com',
  password: 'admin-expenses',
  role: 300,
  confirmed: true,
}];

export const generateManagerUsers = () => {
  const items = range(2).map(() => ({
    email: faker.internet.email(),
    role: 200,
    confirmed: true,
    password: faker.name.findName(),
  }));
  items.push({
    email: 'manager@expenses.com',
    password: 'manager-expenses',
    role: 200,
    confirmed: true,
  });
  return items;
};

export const generateRegularUsers = () => {
  const items = range(20).map(() => ({
    email: faker.internet.email(),
    role: 100,
    confirmed: true,
    password: faker.name.findName(),
  }));
  items.push({
    email: 'user@expenses.com',
    password: 'user-expenses',
    role: 100,
    confirmed: true,
  });
  return items;
};
