/**
 * request
 */
import isObject from 'lodash/isObject';
import agent from 'superagent';

/**
 * Perform ajax request to the url with optional bydy.
 * @param  {string}   url    The url to which the request is performed. Required
 * @param  {object}   body   The payload that will be sent to api. Optional
 * @param  {string}   verb   The http verb method. Optional
 * @param  {object}   query  The query object that will be serialized to url?key=value&...
 * @return {Promise}         The promise always resolves regardless if the error
 *                           occurs. This is for simpler error handling inside
 *                           redux-saga generators.
 */
export default function request(url, body, verb = 'get', query) {
  let method = verb;
  method = verb === 'get' && body ? 'post' : verb;
  const req = agent[method](url).withCredentials().accept('json');

  if (body && isObject(body)) req.send(body);
  if (query && isObject(query)) req.query(query);

  return new Promise((resolve) => {
    req.end((err, res) => resolve({ err, res }));
  });
}
