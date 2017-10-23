Expenses Back
=============

## TODO
- Log errors into disk file at `arc/db/utils.js`
- Change database password

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
~$ git clone git@github.com:dadish/expenses-app.git
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

### Authentication
Most of the API requests require you to be authenticated first. You can do that
via `POST /login` API. There are three user's with different permissions that
you can get authenticated as:
- Admin
  - email: `admin@expenses.com`
  - password: `admin-expenses`
- User Manager
  - email: `manager@expenses.com`
  - password: `manager-expenses`
- Regular User
  - email: `user@expenses.com`
  - password: `user-expenses`

You can check if you have been authenticated via `GET /login` API. It should
return the user credentials of the current authenticated user. E.g.:
```
{
  "id": 25,
  "email": "user@expenses.com",
  "role": 100,
  "confirmed": 1
}
```

### Logout
If you want to logout from the app and authenticate under another user you can
do it via `GET /logout` API. It should return the message `Logout Successful!`


[openapi]: https://www.openapis.org/
