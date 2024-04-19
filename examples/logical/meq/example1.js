import Syntaxe from '../../../dist/esm/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName, status and dateJoined for each object in the array
- Rename fullName as name
- dateJoined must match the provided month and also match the provided year range
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        fullName [as:"name"]
        status
        dateJoined [meq:"January"] [yinrange:[2022, 2024]]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 16,
    name: 'Person 16',
    status: 'under review',
    dateJoined: '2023-01-08T13:42:35.623Z'
  },
  {
    id: 82,
    name: 'Person 82',
    status: 'inactive',
    dateJoined: '2022-01-30T15:06:36.171Z'
  }
]
*/