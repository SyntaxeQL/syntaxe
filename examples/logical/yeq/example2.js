import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName and dateJoined for each object in the array
- Rename fullName as name
- dateJoined must match the provided date range
- lastLogin must match the provided year
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        fullName [as:"name"]
        dateJoined [dtinrange:["${new Date(2016, 0, 0)}", "${new Date()}"]]
        lastLogin? [yeq:2024]
    } [first:5]`
});

await sx.query();

/*
Result:
[
  { id: 59, name: 'Person 59', dateJoined: '2017-02-19T14:58:12.577Z' },
  { id: 68, name: 'Person 68', dateJoined: '2020-12-25T06:03:51.116Z' },
  { id: 72, name: 'Person 72', dateJoined: '2018-08-16T05:53:56.639Z' },
  { id: 74, name: 'Person 74', dateJoined: '2019-10-17T15:03:32.546Z' },
  { id: 89, name: 'Person 89', dateJoined: '2018-08-30T12:26:41.770Z' }
]
*/