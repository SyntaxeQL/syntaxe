import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, package and dateJoined for each object in the array
- package must be 'premium'
- For dateJoined
    - The date must match anything between 2 years ago AND NOW (post-dating)
- Return the first 5 entries for the parent array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        package [eq:"premium"]
        dateJoined [ago:"+2years"]
    } [first:5]`
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
    id: 50,
    package: 'premium',
    dateJoined: '2024-02-29T18:49:47.534Z'
  },
  {
    id: 63,
    package: 'premium',
    dateJoined: '2022-07-29T19:25:39.091Z'
  },
  {
    id: 77,
    package: 'premium',
    dateJoined: '2023-05-04T14:30:59.124Z'
  }
]
*/