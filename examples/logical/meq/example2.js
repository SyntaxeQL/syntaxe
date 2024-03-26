import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, dateJoined and lastLogin for each object in the array
- dateJoined must match the provided month and also match the provided year
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        dateJoined [meq:"Feb"] [yeq:2024]
        lastLogin
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 50,
    dateJoined: '2024-02-29T18:49:47.534Z',
    lastLogin: '2023-05-18T07:29:47.623Z'
  }
]
*/