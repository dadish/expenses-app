import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import Pack from '../../package.json';

const options = {
  info: {
    title: 'Expenses API Documentation',
    version: Pack.version,
    contact: {
      name: 'Nurguly Ashyrov',
      email: 'nurguly.ashyrov@gmail.com',
    },
  },
  documentationPath: '/docs',
};

const swagger = server => new Promise((resolve, reject) => {
  server.register([Inert, Vision, {
    register: HapiSwagger,
    options,
  }], (err) => {
    if (err) reject(err);
    else resolve();
  });
});

export default swagger;
