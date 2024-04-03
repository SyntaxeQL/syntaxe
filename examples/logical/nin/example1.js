import Syntaxe from '../../../dist/index.min.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array where the id is anything except 2 or 5
- For loggedInFrom
    - Return cities
    - Rename cities as city
    - Return first entry for city
    - Return last entry for loggedInFrom
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [nin:[2, 5]]
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
    "id": 1,
    "loggedInFrom": {
      "city": "Vancouver"
    }
  },
  {
    "id": 3,
    "loggedInFrom": {
      "city": "Montreal"
    }
  },
  {
    "id": 4,
    "loggedInFrom": {
      "city": "London"
    }
  }
]
*/