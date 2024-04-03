import Syntaxe from '../../../dist/index.min.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName and lastLogin for each object in the array
- For lastLogin
    - Year must match provided year range
    - Time must be greater 12:30:00
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        lastLogin [yinrange:[2020, 2024]] [tgt:"12:30:00"]
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
  },
  {
    id: 5,
    fullName: 'Person 5',
    lastLogin: '2023-08-17T19:53:58.397Z'
  }
]
*/