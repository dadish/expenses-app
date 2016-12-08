/**
 * request
 */
import isObject from 'lodash/isObject';
import agent from 'superagent';

/**
 * Perform ajax request to the url with optional bydy.
 * @param  {string} url  The url to which the request is performed
 * @param  {object} body The json object with key & value pairs to send to
 *                       the api
 * @return {Promise}     The promise always resolves regardless if the error
 *                       occurs. This is for simpler error handling inside
 *                       redux-saga generators.
 */
export default function request(url, body, verb = 'get') {
  let method = verb;
  method = verb === 'get' && body ? 'post' : verb;
  const req = agent[method](url)
    .withCredentials()
    .accept('json');
  if (body && isObject(body)) {
    req.send(body);
  }
  return new Promise((resolve) => {
    req.end((err, res) => resolve({ err, res }));
  });
}
