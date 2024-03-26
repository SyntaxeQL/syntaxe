import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, status and dateJoined for each object in the array
- status must not match the regular expression 'review'
- For dateJoined 
    - Day of week must match the provided day of week
    - Day must match the provided day range
    - Hour must match provided hour
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        status [regexne:/review/]
        dateJoined [dweq:"Mon"] [dinrange:[15, 30]] [heq:12]
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
  }
]
*/