Expenses Back
=============

## Stack
The main technology stack that are used in this app is:
- Hapi
- Joi
- Boom
- Hapi-Swagger
- co
- knex
- mysql

Assuming you have Node.js@lts and git@^2.7.4 installed on
your system follow the next steps.

Clone the main repo.
```
~$ git clone git@git.toptal.com:Nurguly-Ashyrov/nurguly-ashyrov-2nd-attempt.git
```
Go to `back` directory.
```
~$ cd back
```
## Development Mode
To start the development mode use the following command.
```
~$ npm start
```
You can also start dev server in watch mode and it will restart whenever a file
changes in the `src` directory.
```
~$ npm run start:watch
```
### Testing
To runs the unit tests for your app.
```
~$ npm test
```

### Production
To build a production app.
```
~$ npm build
```
To serve the production app.
```
~$ npm run start:production
```

## REST API
After you start the start the app you can open the REST API documentation from
your browser via http://localhost:3001/docs

The documentation spec is based on [Open Api Specification][openapi] (aka Swagger).
There you can test API with the tools provided by the Swagger Spec.

[openapi]: https://www.openapis.org/
