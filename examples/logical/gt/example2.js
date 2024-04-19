import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status and loggedInFrom for each object in the array
- For loggedInFrom
  - Return country and cities
  - The object containing country and cities should be returned only if the country is 'Canada'
- The parent object is returned only if the size of loggedInFrom is greater than 1
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        status
        loggedInFrom {
            country [eq:"Canada"]
            cities
        } [size] [gt:1]
    }`
});

await sx.query();

/*
Result:
[
  {
    "id": 3,
    "status": "under review",
    "loggedInFrom": 2
  }
]
*/