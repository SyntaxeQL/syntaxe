import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array where the id is not null, undefined or empty
- For loggedInFrom
    - Return cities
    - Rename cities as city
    - Return last entry for city
    - Return first entry for loggedInFrom
    - Rename loggedInFrom as accessCity
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [nn]
        loggedInFrom {
            cities [as:"city"] [last]
        } [first] [as:"accessCity"]
    }`
});

await sx.query();

/*
Result:
[
  {
    "id": 1,
    "accessCity": {
      "city": "Manchester"
    }
  },
  {
    "id": 2,
    "accessCity": {
      "city": "Los Angeles"
    }
  },
  {
    "id": 3,
    "accessCity": {
      "city": "Toronto"
    }
  },
  {
    "id": 4,
    "accessCity": {
      "city": "London"
    }
  },
  {
    "id": 5,
    "accessCity": {
      "city": "New York"
    }
  }
]
*/