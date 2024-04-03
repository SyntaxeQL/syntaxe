import Syntaxe from '../../../dist/index.min.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array where the id is 3
- For loggedInFrom
  - Return country and cities
  - The object containing country and cities should be returned only if the country is 'Canada'
  - Return distinct values for cities
  - Return distinct country and cities objects filtered by country
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [eq:3]
        loggedInFrom {
            country [eq:"Canada"]
            cities [dist]
        } [dist:"country"]
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
        "cities": [
          "Vancouver",
          "Montreal",
          "Toronto"
        ]
      }
    ]
  }
]
*/