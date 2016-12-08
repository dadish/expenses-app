import { SubmissionError } from 'redux-form/immutable';

const boomToReduxForm = (err) => {
  const errObj = JSON.parse(err.message).reduce((memo, error) => ({
    ...memo,
    [error.path]: error.message,
  }), {});
  return new SubmissionError(errObj);
};

export default boomToReduxForm;
