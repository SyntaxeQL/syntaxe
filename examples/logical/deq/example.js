import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName, status and dateJoined for each object in the array
- Rename fullName as name
- For dateJoined 
    - day must match the provided day
    - month must match provided month 
    - year must match the provided year range
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        fullName [as:"name"]
        status
        dateJoined [deq:30] [meq:"January"] [yinrange:[2022, 2024]]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 82,
    name: 'Person 82',
    status: 'inactive',
    dateJoined: '2022-01-30T15:06:36.171Z'
  }
]
*/