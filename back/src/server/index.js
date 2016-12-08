import Hapi from 'hapi';
import config from '../config';

const server = new Hapi.Server();

server.connection({ port: config.port });

export default server;
