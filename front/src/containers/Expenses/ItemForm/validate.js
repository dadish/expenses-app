import toNumber from 'lodash/toNumber';
import isNumber from 'lodash/isNumber';
import isNaN from 'lodash/isNaN';

const validate = (values) => {
  const { amount } = values.toJS();
  const amountNumber = toNumber(amount);
  if (!isNumber(amountNumber) || isNaN(amountNumber)) return { amount: 'Must be a number.' };
  return {};
};

export default validate;
