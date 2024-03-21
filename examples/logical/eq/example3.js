import Syntaxe from '../../../src/index.js';
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
        status
        loggedInFrom {
            country
            cities [first] [as:"city"] [eq:"Vancouver"]
        }
    } [first:3]`
});

await sx.query();

/*
Result:
[
  {
    "userId": 1,
    "status": "active",
    "loggedInFrom": [
      {
        "country": "Canada",
        "city": "Vancouver"
      }
    ]
  },
  {
    "userId": 2,
    "status": "under review",
    "loggedInFrom": []
  },
  {
    "userId": 3,
    "status": "under review",
    "loggedInFrom": [
      {
        "country": "Canada",
        "city": "Vancouver"
      }
    ]
  }
]
*/