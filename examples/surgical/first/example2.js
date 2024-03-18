import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

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