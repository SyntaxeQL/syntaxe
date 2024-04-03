import Syntaxe from '../../../dist/index.min.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status, langs and loggedInFrom for each object in the array
- Rename id as userId
- Rename langs as languages
- For loggedInFrom
  - Return country and cities
  - Return first entry for cities
  - Return last entry for loggedInFrom
- Return last 2 entries for the parent array 
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [as:"userId"]
        status
        langs [as:"languages"]
        loggedInFrom {
            country
            cities [first]
        } [last]
    } [last:2]`
});

await sx.query();

/*
Result:
[
  {
    "userId": 4,
    "status": "active",
    "languages": [
      "Korean"
    ],
    "loggedInFrom": {
      "country": "UK",
      "cities": "London"
    }
  },
  {
    "userId": 5,
    "status": "inactive",
    "languages": [
      "Korean"
    ],
    "loggedInFrom": {
      "country": "USA",
      "cities": "Los Angeles"
    }
  }
]
*/