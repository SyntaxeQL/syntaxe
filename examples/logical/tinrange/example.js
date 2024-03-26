import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName, status, package and lastLogin for each object in the array
- For lastLogin
    - Year must match provided year range
    - Time must match the provided time range 
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        status
        package
        lastLogin [yinrange:[2020, 2024]] [tinrange:["12:30:00", "20:00:00"]]
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
    package: 'free',
    lastLogin: '2023-07-15T16:21:52.915Z'
  }
]
*/