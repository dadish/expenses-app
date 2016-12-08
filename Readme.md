Expenses
========
This is an Expenses app.

## Structure
The app is divided to two root directories which are
essentially independent from each other. The purpose is to
separate the back-end logic from front end. This also allows
us to serve the static front end files from any static CDN
like github-pages. While the back-end API could be served
from your own servers.

The front-end logic of the app is located in the `front`
directory while back-end of the app is located in `back`.
