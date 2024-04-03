import Syntaxe from '../../../dist/index.min.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status and loggedInFrom for each object in the array
- For loggedInFrom
  - Return country and cities
  - Return the first entry for cities
  - Rename cities as city
  - The object containing country and city should be returned only if the country is 'Canada' (case-sensitive) and city is 'Vancouver' (case-insensitive)
- Return the first three entries for parent array after all operations
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [as:"userId"]
        status [eqi:"Active"]
        loggedInFrom {
            country [eq:"Canada"]
            cities [first] [as:"city"] [eqi:"Vancouver"]
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
    "userId": 4,
    "status": "active",
    "loggedInFrom": []
  }
]
*/