import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, package and dateJoined for each object in the array
- package must be 'premium'
- For dateJoined
    - The date must match anything between 2 years ago AND BEFORE THAT (back-dating)
- Return the first 5 entries for the parent array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        package [eq:"premium"]
        dateJoined [ago:"-2years"]
    } [first:5]`
});

await sx.query();

/*
Result:
[
  { id: 8, package: 'premium', dateJoined: '2015-03-22T20:48:41.463Z' },
  {
    id: 12,
    package: 'premium',
    dateJoined: '2021-01-29T05:37:15.208Z'
  },
  {
    id: 14,
    package: 'premium',
    dateJoined: '2015-04-13T17:58:53.723Z'
  },
  {
    id: 17,
    package: 'premium',
    dateJoined: '2020-02-18T12:00:30.519Z'
  },
  {
    id: 18,
    package: 'premium',
    dateJoined: '2017-11-29T08:41:35.870Z'
  }
]
*/