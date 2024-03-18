import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

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