import Hapi from 'hapi';

const server = new Hapi.Server();

server.connection({ port: 3001 });

export default server;
