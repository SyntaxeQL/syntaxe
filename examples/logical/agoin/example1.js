import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, status, package, dateJoined and lastLogin for each object in the array
- status must be 'active'
- package must be 'premium'
- For dateJoined
    - The date must match anything between 2 years and 5 years ago
- For lastLogin
    - The day of week must match at least one entry in the provided array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        status [eq:"active"]
        package [eq:"premium"]
        dateJoined [agoin:["2years", "5years"]]
        lastLogin [dwin:["Tue", "Thur", "Sat"]]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 12,
    status: 'active',
    package: 'premium',
    dateJoined: '2021-01-29T05:37:15.208Z',
    lastLogin: '2020-09-14T23:37:50.657Z'
  },
  {
    id: 27,
    status: 'active',
    package: 'premium',
    dateJoined: '2019-12-13T00:56:52.644Z',
    lastLogin: '2022-07-05T09:22:52.275Z'
  },
  {
    id: 70,
    status: 'active',
    package: 'premium',
    dateJoined: '2020-02-16T13:36:07.600Z',
    lastLogin: '2020-03-05T02:13:43.970Z'
  },
  {
    id: 87,
    status: 'active',
    package: 'premium',
    dateJoined: '2020-09-11T06:56:11.758Z',
    lastLogin: '2022-11-19T00:33:13.402Z'
  }
]
*/