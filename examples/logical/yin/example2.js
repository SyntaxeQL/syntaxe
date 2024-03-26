import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName, status, dateJoined and lastLogin for each object in the array
- Rename fullName as name
- status must match 'active'
- dateJoined must match at least one entry in the provided year array
- lastLogin must match at least one entry in the provided year array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        fullName [as:"name"]
        status [eq:"active"]
        dateJoined [yin:[2022, 2023, 2024]]
        lastLogin [yin:[2016, 2020, 2022]]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 95,
    name: 'Person 95',
    status: 'active',
    dateJoined: '2022-07-21T05:54:44.121Z',
    lastLogin: '2022-04-24T19:25:11.106Z'
  }
]
*/