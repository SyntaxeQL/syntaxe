import Syntaxe from '../../../dist/esm/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, dateJoined and lastLogin for each object in the array
- id must be greater than 50
- dateJoined must have a month greater than 'January'
- lastLogin must match the provided year and also match the provided month
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id [gt:50]
        dateJoined [mgt:"January"]
        lastLogin [yeq:2024] [meq:"Mar"]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 59,
    dateJoined: '2017-02-19T14:58:12.577Z',
    lastLogin: '2024-03-06T12:25:26.831Z'
  },
  {
    id: 72,
    dateJoined: '2018-08-16T05:53:56.639Z',
    lastLogin: '2024-03-13T06:38:55.209Z'
  }
]
*/