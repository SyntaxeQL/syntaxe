import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName, status and dateJoined for each object in the array
- Rename fullName as name
- status must be 'active'
- dateJoined must be greater than the year provided
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        fullName [as:"name"]
        status [eq:"active"]
        dateJoined [ygt:2022]
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
    dateJoined: '2024-02-29T18:49:47.534Z'
  }
]
*/