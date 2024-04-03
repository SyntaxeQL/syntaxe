import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, status and dateJoined for each object in the array
- status must match 'active' OR match the regular expression 'review'
- For dateJoined 
    - day must match one of the entries in the provided array
    - month must match provided month
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        status [eq:"active"] [regex:/review/] [cond:"or"]
        dateJoined [din:[10, 13, 15, 18, 25]] [meq:"January"]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 40,
    status: 'under review',
    dateJoined: '2021-01-10T10:58:00.903Z'
  },
  { id: 86, status: 'active', dateJoined: '2019-01-25T04:31:44.376Z' }
]
*/