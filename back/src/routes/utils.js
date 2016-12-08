export const handleInternalError = (err) => {
  console.log(err); // eslint-disable-line no-console
  throw err;
};

export default {
  handleInternalError,
};
