import Syntaxe from '../../../dist/index.min.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status, langs and loggedInFrom for each object in the array
- Rename id as userId
- Rename langs as languages
- Return first entry for languages
- Return first entry for loggedInFrom
- Return first 3 entries for parent array
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [as:"userId"]
        status
        langs [as:"languages"] [first]
        loggedInFrom [first]
    } [first:3]`
});

await sx.query();

/*
Result:
[
  {
    "userId": 1,
    "status": "active",
    "languages": "English",
    "loggedInFrom": {
      "country": "UK",
      "cities": [
        "Glasgow",
        "Liverpool",
        "Manchester"
      ]
    }
  },
  {
    "userId": 2,
    "status": "under review",
    "languages": "Japanese",
    "loggedInFrom": {
      "country": "USA",
      "cities": [
        "Phoenix",
        "New York",
        "Los Angeles"
      ]
    }
  },
  {
    "userId": 3,
    "status": "under review",
    "languages": "English",
    "loggedInFrom": {
      "country": "Canada",
      "cities": [
        "Vancouver",
        "Montreal",
        "Toronto"
      ]
    }
  }
]
*/