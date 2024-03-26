import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, status and dateJoined for each object in the array
- status must not match the regular expression 'review'
- For dateJoined 
    - Day of week must match the provided day of week
    - Day must match the provided day range
    - Month must match provided month
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        status [regexne:/review/]
        dateJoined [dweq:"Mon"] [dinrange:[15, 30]] [meq:"Feb"]
    }`
});

await sx.query();

/*
Result:
[
  { id: 94, status: 'active', dateJoined: '2020-02-17T21:05:32.186Z' }
]
*/