import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

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