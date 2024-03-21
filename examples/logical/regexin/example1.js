import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array where the id is greater than or equal to 3
- For loggedInFrom
    - Return country and cities
    - Return the object if the provided regular expression matches the country
    - Rename cities as city
    - Return first entry for city
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [gte:3]
        loggedInFrom {
            country [regexin:[/da$/i, /^us/i]]
            cities [as:"city"] [first]
        }
    }`
});

await sx.query();

/*
Result:
[
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
    "id": 4,
    "loggedInFrom": []
  },
  {
    "id": 5,
    "loggedInFrom": [
      {
        "country": "USA",
        "city": "Houston"
      },
      {
        "country": "USA",
        "city": "Los Angeles"
      }
    ]
  }
]
*/