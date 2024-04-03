import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, status and dateJoined for each object in the array
- id must be greater than 80
- status must not match the regular expression 'review'
- For dateJoined 
    - Day of week must match the provided day of week range
    - Hour must match the provided hour range
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id [gt:80]
        status [regexne:/review/]
        dateJoined [dwinrange:["Mon", "Wed"]] [hinrange:[10, 23]]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 81,
    status: 'inactive',
    dateJoined: '2016-01-11T20:35:29.495Z'
  },
  {
    id: 85,
    status: 'inactive',
    dateJoined: '2016-12-12T18:26:53.731Z'
  },
  { id: 94, status: 'active', dateJoined: '2020-02-17T21:05:32.186Z' },
  { id: 97, status: 'active', dateJoined: '2019-05-01T22:43:07.715Z' }
]
*/