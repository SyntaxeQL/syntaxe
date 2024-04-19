import Syntaxe from '../../../dist/esm/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id and lastLogin for each object in the array
- lastLogin must have a month greater than the provided month and also match the provided year
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        lastLogin [mgt:"Jan"] [yeq:2024]
    }`
});

await sx.query();

/*
Result:
[
  { id: 59, lastLogin: '2024-03-06T12:25:26.831Z' },
  { id: 68, lastLogin: '2024-02-08T10:00:20.827Z' },
  { id: 72, lastLogin: '2024-03-13T06:38:55.209Z' },
  { id: 89, lastLogin: '2024-02-03T18:24:47.166Z' }
]
*/