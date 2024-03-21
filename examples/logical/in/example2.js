import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array where the id is 1, 3 or 5
- For loggedInFrom
    - Return country and cities
    - Return the object if country is 'Uk' or 'Canada'
    - Rename cities as city
    - Return first entry for city
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [in:[1, 3, 5]]
        loggedInFrom {
            country [in:["UK", "Canada"]]
            cities [as:"city"] [first]
        }
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
        "country": "UK",
        "city": "Glasgow"
      },
      {
        "country": "Canada",
        "city": "Vancouver"
      }
    ]
  },
  {
    "id": 3,
    "loggedInFrom": [
      {
        "country": "Canada",
        "city": "Vancouver"
      },
      {
        "country": "Canada",
        "city": "Montreal"
      }
    ]
  },
  {
    "id": 5,
    "loggedInFrom": []
  }
]
*/