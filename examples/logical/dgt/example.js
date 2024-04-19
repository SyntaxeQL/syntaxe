import Syntaxe from '../../../dist/esm/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName, status and dateJoined for each object in the array
- Rename fullName as name
- status must match 'active'
- For dateJoined 
    - day must be greater than the provided day
    - month must match provided month
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        fullName [as:"name"]
        status [eq:"active"]
        dateJoined [dgt:10] [meq:"January"]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 12,
    name: 'Person 12',
    status: 'active',
    dateJoined: '2021-01-29T05:37:15.208Z'
  },
  {
    id: 29,
    name: 'Person 29',
    status: 'active',
    dateJoined: '2021-01-30T01:29:12.520Z'
  },
  {
    id: 86,
    name: 'Person 86',
    status: 'active',
    dateJoined: '2019-01-25T04:31:44.376Z'
  }
]
*/