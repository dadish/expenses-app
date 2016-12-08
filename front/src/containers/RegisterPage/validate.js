import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

const message = {
  required: 'This field is required',
  max: num => `Should be less than ${num} characters.`,
  min: num => `Should be more than ${num} characters.`,
};

let errors = [];

const add = (field, msg) => errors.push({ field, msg });

const errorsArrayToObject = arr => arr.reduce((memo, error) => ({
  ...memo,
  [error.field]: error.msg,
}), {});

const validate = (values) => {
  const { email, password, passwordConfirm } = values.toJS();

  // empty the old errors
  errors = [];

  // email
  if (!email || isEmpty(email)) add('email', message.required);
  // should be valid email
  else if (!isEmail(email)) add('email', 'Invalid email');

  // password
  if (!password || isEmpty(password)) add('password', message.required);
  // should be at least 6 characters
  else if (password.length < 6) add('password', message.min(6));
  // should be less than 128 characters
  else if (password.length > 128) add('password', message.max(128));

  // passwordConfirm
  // should be the same as password
  if (password !== passwordConfirm) add('passwordConfirm', 'Should be the same as Password');

  return errorsArrayToObject(errors);
};

export default validate;
