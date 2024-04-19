import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array where the id is 2 or 5
- For loggedInFrom
    - Return cities
    - Rename cities as city
    - Return first entry for city
    - Return last entry for loggedInFrom
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [in:[2, 5]]
        loggedInFrom {
            cities [as:"city"] [first]
        } [last]
    }`
});

await sx.query();

/*
Result:
[
  {
    "id": 2,
    "loggedInFrom": {
      "city": "New York"
    }
  },
  {
    "id": 5,
    "loggedInFrom": {
      "city": "Los Angeles"
    }
  }
]
*/