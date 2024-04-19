import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array where the id is greater than 3
- For loggedInFrom
    - Return country and cities
    - The object containing country and cities should be returned only if the country is 'Canada'
    - Return distinct values for cities
    - Return distinct country and cities objects filtered by country
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [gt:3]
        loggedInFrom {
            country [eq:"Canada"]
            cities [dist]
        } [dist:"country"]
    }`
});

await sx.query();

/*
Result:
[
  {
    "id": 4,
    "loggedInFrom": []
  },
  {
    "id": 5,
    "loggedInFrom": []
  }
]
*/