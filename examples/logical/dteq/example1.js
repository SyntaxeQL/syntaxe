import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, dateJoined and loggedInFrom for each object in the array
- dateJoined must match at least one of the two provided date values
- For loggedInFrom
  - Return cities
  - The object is only returned if the size of cities is greater than 2
  - Return last two entries for loggedInFrom
*/

const dateJoined1 = new Date("2016-01-03");
const dateJoined2 = new Date("2022-08-06");

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        dateJoined [dteq:"${dateJoined1}"] [dteq:"${dateJoined2}"] [cond:"or"]
        loggedInFrom {
            cities [sgt:2]
        } [last:2]
    }`
});

await sx.query();

/*
Result:
[
  {
    "id": 1,
    "dateJoined": "2016-01-03T12:08:32.968Z",
    "loggedInFrom": [
      { "cities": ["Glasgow"  , "Liverpool", "Manchester"] },
      { "cities": ["Vancouver", "Montreal" , "Vancouver" ] }
    ]
  },
  {
    "id": 3,
    "dateJoined": "2022-08-06T22:17:06.108Z",
    "loggedInFrom": [
      { "cities": ["Vancouver", "Montreal", "Toronto"] },
      { "cities": ["Montreal" , "Calgary" , "Ottawa" ] }
    ]
  }
]
*/