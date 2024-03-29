import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, dateJoined and lastLogin for each object in the array
- status must be 'active'
- For dateJoined
    - The date must match anything between 30 months and 100 months ago
- For lastLogin
    - The day of week must be 'Monday'
- Return the first 5 entries for the parent array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        status? [eq:"active"]
        dateJoined [agoin:["30months", "100months"]]
        lastLogin [dweq:"Mon"]
    } [first:5]`
});

await sx.query();

/*
Result:
[
  {
    id: 10,
    dateJoined: '2020-12-29T20:52:38.184Z',
    lastLogin: '2022-02-21T15:48:19.270Z'
  },
  {
    id: 34,
    dateJoined: '2020-12-05T09:32:55.580Z',
    lastLogin: '2020-06-29T14:58:40.799Z'
  },
  {
    id: 42,
    dateJoined: '2020-03-06T01:24:39.836Z',
    lastLogin: '2021-08-16T15:20:21.667Z'
  },
  {
    id: 56,
    dateJoined: '2016-03-31T18:06:42.108Z',
    lastLogin: '2023-01-02T01:18:59.491Z'
  },
  {
    id: 74,
    dateJoined: '2019-10-17T15:03:32.546Z',
    lastLogin: '2024-01-29T18:34:15.099Z'
  }
]
*/