import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id and dateJoined for each object in the array
- package must be 'premium'
- For dateJoined (condition - or)
    - The date can match anything between 2 years ago AND BEFORE THAT (back-dating)
    - The year can be less or greater than 2020
    - The day of week can be 'Monday' or anything
    - At least one of the above conditions must evaluate to true for the object to be returned
- Return the first 5 entries for the parent array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        package? [eq:"premium"]
        dateJoined [ago:"-2years"] [ylt:2020] [dweq:"Monday"] [cond:"or"]
    } [first:5]`
});

await sx.query();

/*
Result:
[
  { id: 8, dateJoined: '2015-03-22T20:48:41.463Z' },
  { id: 12, dateJoined: '2021-01-29T05:37:15.208Z' },
  { id: 14, dateJoined: '2015-04-13T17:58:53.723Z' },
  { id: 17, dateJoined: '2020-02-18T12:00:30.519Z' },
  { id: 18, dateJoined: '2017-11-29T08:41:35.870Z' }
]
*/