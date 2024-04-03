import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, package and dateJoined for each object in the array
- package must be 'premium'
- For dateJoined
    - The date must match exactly 2 years ago
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        package [eq:"premium"]
        dateJoined [ago:"2years"]
    }`
});

await sx.query();

/*
Result:
[
  { id: 3, package: 'premium', dateJoined: '2022-08-06T22:17:06.108Z' },
  {
    id: 49,
    package: 'premium',
    dateJoined: '2022-06-16T14:42:01.174Z'
  },
  {
    id: 63,
    package: 'premium',
    dateJoined: '2022-07-29T19:25:39.091Z'
  }
]
*/