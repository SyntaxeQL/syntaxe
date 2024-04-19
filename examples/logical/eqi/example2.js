import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status and loggedInFrom for each object in the array
- For loggedInFrom
  - Return country and cities
  - The object containing country and cities should be returned only if the country is 'CANADA' (case-insensitive)
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        status
        loggedInFrom {
            country [eqi:"CANADA"]
            cities
        }
    }`
});

await sx.query();

/*
Result:
[
  {
    "id": 1,
    "status": "active",
    "loggedInFrom": [
      {
        "country": "Canada",
        "cities": [
          "Vancouver",
          "Montreal",
          "Vancouver"
        ]
      }
    ]
  },
  {
    "id": 2,
    "status": "under review",
    "loggedInFrom": []
  },
  {
    "id": 3,
    "status": "under review",
    "loggedInFrom": [
      {
        "country": "Canada",
        "cities": [
          "Vancouver",
          "Montreal",
          "Toronto"
        ]
      },
      {
        "country": "Canada",
        "cities": [
          "Montreal",
          "Calgary",
          "Ottawa"
        ]
      }
    ]
  },
  {
    "id": 4,
    "status": "active",
    "loggedInFrom": []
  },
  {
    "id": 5,
    "status": "inactive",
    "loggedInFrom": []
  }
]
*/