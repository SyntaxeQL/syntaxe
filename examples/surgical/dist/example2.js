import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array
- For loggedInFrom
  - Return country and cities
  - Return distinct values for cities
  - Return distinct country and cities objects filtered by country
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        loggedInFrom {
            country
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
      { "country": "UK", "cities": ["Glasgow", "Liverpool", "Manchester"] },
      { "country": "Canada", "cities": ["Vancouver", "Montreal"] }
    ]
  },
  {
    "id": 2,
    "loggedInFrom": [
      { "country": "USA", "cities": ["Phoenix", "New York"  , "Los Angeles"] },
      { "country": "UK" , "cities": ["London" , "Manchester"] }
    ]
  },
  {
    "id": 3,
    "loggedInFrom": [
      {
        "country": "Canada",
        "cities": ["Vancouver", "Montreal", "Toronto"]
      }
    ]
  },
  {
    "id": 4,
    "loggedInFrom": [
      {
        "country": "UK",
        "cities": ["London", "Manchester"]
      }
    ]
  },
  {
    "id": 5,
    "loggedInFrom": [
      {
        "country": "USA",
        "cities": ["Houston", "Los Angeles", "New York"]
      }
    ]
  }
]
*/