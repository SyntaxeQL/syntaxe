import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array
- For loggedInFrom
  - Return cities
  - Return first entry for cities
- Return the parent object only if the size of loggedInFrom is 2
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        loggedInFrom {
            cities [first]
        } [seq:2]
    }`
});

await sx.query();

/*
Result:
[
  {
    "id": 1,
    "loggedInFrom": [
      {
        "cities": "Glasgow"
      },
      {
        "cities": "Vancouver"
      }
    ]
  },
  {
    "id": 3,
    "loggedInFrom": [
      {
        "cities": "Vancouver"
      },
      {
        "cities": "Montreal"
      }
    ]
  },
  {
    "id": 5,
    "loggedInFrom": [
      {
        "cities": "Houston"
      },
      {
        "cities": "Los Angeles"
      }
    ]
  }
]
*/