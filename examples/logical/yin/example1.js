import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName, status and lastLogin for each object in the array
- Rename fullName as name
- status must not match any entry in the provided array
- lastLogin must match at least one entry in year array provided
- Return the last 5 entries for the parent array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        fullName [as:"name"]
        status [nin:["active", "inactive"]]
        lastLogin [yin:[2021, 2022, 2023]]
    } [last:5]`
});

await sx.query();

/*
Result:
[
  {
    id: 76,
    name: 'Person 76',
    status: 'under review',
    lastLogin: '2022-07-24T04:20:26.636Z'
  },
  {
    id: 77,
    name: 'Person 77',
    status: 'under review',
    lastLogin: '2023-12-14T11:26:08.575Z'
  },
  {
    id: 84,
    name: 'Person 84',
    status: 'under review',
    lastLogin: '2021-02-05T23:16:11.036Z'
  },
  {
    id: 91,
    name: 'Person 91',
    status: 'under review',
    lastLogin: '2023-10-15T21:27:31.177Z'
  },
  {
    id: 93,
    name: 'Person 93',
    status: 'under review',
    lastLogin: '2023-06-22T14:47:57.994Z'
  }
]
*/