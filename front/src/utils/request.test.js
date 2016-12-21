import expect from 'expect';
import request from './request';

const url = '/';

const body = {
  name: 'tobi',
  pet: 'tj',
};

it('returns promise', () => {
  expect(request(url)).toBeA(Promise);
  expect(request(url, body)).toBeA(Promise);
});

it('resolves even when error occurs', () => request(url, body)
.then((data) => {
  expect(data.err).toExist();
}));

it('appends a query string if fourth argument is provided', () => request('one', null, 'get', { foo: 'bar' })
.then((data) => {
  expect(data).toExist();
}));
