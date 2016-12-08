import pify from 'pify';
/**
 * Registers the scheme to the server then fires callback
 * @param  {Hapi Server}   server  The hapi server into which you wish to
 *                                 register the scheme
 * @param  {Hapi Plugin}   scheme  The hapi authentication scheme plugin.
 * @return {Promise}
 */
export const registerScheme = (server, scheme) => pify(server.register.bind(server))(scheme);

export default {};
