import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, status and dateJoined for each object in the array
- status must not match the regular expression 'review'
- For dateJoined 
    - Day of week must match the provided day of week range
    - Hour must match at least one entry in the provided array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        status [regexne:/review/]
        dateJoined [dwinrange:["Mon", "Wed"]] [hin:[1, 3, 4, 7, 10]]
    }`
});

await sx.query();

/*
Result:
[
  { id: 25, status: 'active', dateJoined: '2019-02-12T02:00:07.021Z' },
  { id: 43, status: 'active', dateJoined: '2021-09-21T02:09:25.158Z' }
]
*/