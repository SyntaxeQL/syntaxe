import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName, status and lastLogin for each object in the array
- status must match none of the entries in the provided array
- For lastLogin
    - Year must match provided year range
    - Hour must match the provided hour range
    - Minute must match the provided minute range
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        status [nin:["active", "pending"]]
        lastLogin [yinrange:[2020, 2024]] [hinrange:[10, 20]] [mininrange:[10, 55]]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 2,
    fullName: 'Person 2',
    status: 'under review',
    lastLogin: '2023-07-15T16:21:52.915Z'
  },
  {
    id: 5,
    fullName: 'Person 5',
    status: 'inactive',
    lastLogin: '2023-08-17T19:53:58.397Z'
  }
]
*/