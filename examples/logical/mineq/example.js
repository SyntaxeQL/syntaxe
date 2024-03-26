import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName and lastLogin for each object in the array
- For lastLogin
    - Year must match provided year range
    - Hour must match the provided hour range
    - Minute must be 21
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        lastLogin [yinrange:[2020, 2024]] [hinrange:[10, 20]] [mineq:21]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 2,
    fullName: 'Person 2',
    lastLogin: '2023-07-15T16:21:52.915Z'
  }
]
*/