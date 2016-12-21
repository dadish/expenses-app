import { fromJS } from 'immutable';
import validate from './validate';

test('reports error if the string is not a number', () => {
  expect(validate(fromJS({ amount: 'some' })).amount).toBeTruthy();
});

test('reports no error if value is correct', () => {
  expect(validate(fromJS({ amount: '3.4' })).amount).toBeFalsy();
});
