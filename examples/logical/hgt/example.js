import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, status and dateJoined for each object in the array
- status must not match the regular expression 'review'
- For dateJoined 
    - Day of week must match the provided day of week
    - Day must match the provided day range
    - Hour must be greater than the provided hour
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        status [regexne:/review/]
        dateJoined [dweq:"Mon"] [dinrange:[15, 30]] [hgt:10]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 71,
    status: 'inactive',
    dateJoined: '2016-12-19T11:56:33.604Z'
  },
  { id: 94, status: 'active', dateJoined: '2020-02-17T21:05:32.186Z' }
]
*/