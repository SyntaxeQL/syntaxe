import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName and lastLogin for each object in the array
- For lastLogin
    - Year must match provided year range
    - Time must match at least one entry in provided array 
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        lastLogin [yinrange:[2020, 2024]] [tin:["05:31:09", "12:30:00", "17:21:52"]]
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
    id: 3,
    fullName: 'Person 3',
    lastLogin: '2023-08-29T04:31:09.580Z'
  }
]
*/