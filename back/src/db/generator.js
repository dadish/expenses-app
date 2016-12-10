import faker from 'faker';
import range from 'lodash/range';
import random from 'lodash/random';

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

export const generateExpenses = () => range(120).map(() => ({
  user: random(1, 25),
  amount: random(1, 50000),
  date: `2016-12-${random(1, 31)} ${random(9, 21)}:${random(1, 59)}`,
  description: faker.lorem.sentence(),
  comment: faker.lorem.sentence(),
}));
