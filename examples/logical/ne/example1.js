import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array where the id is not 3, 4 or 5
- For loggedInFrom
  - Return country and cities
  - The object containing country and cities should be returned only if the country is not 'Canada'
  - Return distinct values for cities
  - Return distinct country and cities objects filtered by country
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [ne:3] [ne:4] [ne:5]
        loggedInFrom {
            country [ne:"Canada"]
            cities [dist]
        } [dist:"country"]
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
        "cities": [
          "Glasgow",
          "Liverpool",
          "Manchester"
        ]
      }
    ]
  },
  {
    "id": 2,
    "loggedInFrom": [
      {
        "country": "USA",
        "cities": [
          "Phoenix",
          "New York",
          "Los Angeles"
        ]
      },
      {
        "country": "UK",
        "cities": [
          "London",
          "Manchester"
        ]
      }
    ]
  }
]
*/