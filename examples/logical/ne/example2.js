import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status and loggedInFrom for each object in the array
- For loggedInFrom
  - Return country and cities
  - Return the first entry for cities
  - Rename cities as city
  - The object containing country and city should be returned only if the city is 'Vancouver'
- Return the first three entries for parent array after all operations
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [as:"userId"]
        status [ne:"active"]
        loggedInFrom [size]
    } [first:3]`
});

await sx.query();

/*
Result:
[
  {
    "userId": 2,
    "status": "under review",
    "loggedInFrom": 4
  },
  {
    "userId": 3,
    "status": "under review",
    "loggedInFrom": 2
  },
  {
    "userId": 5,
    "status": "inactive",
    "loggedInFrom": 2
  }
]
*/