import Syntaxe from '../../../dist/esm/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, status and dateJoined for each object in the array
- status must not match the regular expression 'review'
- For dateJoined 
    - day must match the provided day range
    - month must match provided month
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        status [regexne:/review/]
        dateJoined [dinrange:[15, 30]] [meq:"Feb"]
    }`
});

await sx.query();

/*
Result:
[
  { id: 17, status: 'active', dateJoined: '2020-02-18T12:00:30.519Z' },
  { id: 50, status: 'active', dateJoined: '2024-02-29T18:49:47.534Z' },
  {
    id: 59,
    status: 'inactive',
    dateJoined: '2017-02-19T14:58:12.577Z'
  },
  { id: 70, status: 'active', dateJoined: '2020-02-16T13:36:07.600Z' },
  {
    id: 73,
    status: 'inactive',
    dateJoined: '2019-02-15T10:26:37.785Z'
  },
  { id: 94, status: 'active', dateJoined: '2020-02-17T21:05:32.186Z' }
]
*/