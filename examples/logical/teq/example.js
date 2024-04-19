import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName and lastLogin for each object in the array
- For lastLogin
    - Year must match provided year range
    - Time must be 05:31:09
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        lastLogin [yinrange:[2020, 2024]] [teq:"05:31:09"]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 3,
    fullName: 'Person 3',
    lastLogin: '2023-08-29T04:31:09.580Z'
  }
]
*/