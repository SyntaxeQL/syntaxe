import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName, status, dateJoined and lastLogin for each object in the array
- Rename fullName as name
- status must match 'active'
- dateJoined must match the provided year range
- lastLogin must match at least one entry in the provided year array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        fullName [as:"name"]
        status [eq:"active"]
        dateJoined [yinrange:[2020, 2024]]
        lastLogin [yin:[2023, 2024]]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 50,
    name: 'Person 50',
    status: 'active',
    dateJoined: '2024-02-29T18:49:47.534Z',
    lastLogin: '2023-05-18T07:29:47.623Z'
  },
  {
    id: 94,
    name: 'Person 94',
    status: 'active',
    dateJoined: '2020-02-17T21:05:32.186Z',
    lastLogin: '2023-03-27T02:49:29.732Z'
  }
]
*/