import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array
- For loggedInFrom
  - Return cities
  - The object is only returned if the size of cities is greater than 1
- Return the parent object only if the size of loggedInFrom is greater than 2
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        loggedInFrom {
            cities [sgt:1]
        } [sgt:2]
    }`
});

await sx.query();

/*
Result:
[
  {
    "id": 2,
    "loggedInFrom": [
      { "cities": ["Phoenix"    , "New York"   , "Los Angeles"] },
      { "cities": ["London"     , "Manchester" , "Manchester" ] },
      { "cities": ["Los Angeles", "Chicago"    , "Houston"    ] },
      { "cities": ["New York"   , "Los Angeles", "Los Angeles"] }
    ]
  }
]
*/