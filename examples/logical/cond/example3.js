import Syntaxe from '../../../dist/esm/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, dateJoined and lastLogin for each object in the array
- package must be 'premium'
- For dateJoined (condition - or)
    - The date can match anything between 2 years ago AND BEFORE THAT (back-dating)
    - The year can be less or greater than 2020
    - The day of week can be 'Monday' or anything
    - At least one of the above conditions must evaluate to true for the object to be returned
- For lastLogin (condition - and)
    - The date must match anything between 2 years ago AND BEFORE THAT (back-dating)
    - The day of week must be 'Thursday'
    - All the above operations and conditions MUST evaluate to true
- Return the first 5 entries for the parent array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        package? [eq:"premium"]
        dateJoined [ago:"-2years"] [ylt:2020] [dweq:"Monday"] [cond:"or"]
        lastLogin [ago:"-2years"] [dweq:"Thursday"] [cond:"and"]
    } [first:5]`
});

await sx.query();

/*
Result:
[
  {
    id: 14,
    dateJoined: '2015-04-13T17:58:53.723Z',
    lastLogin: '2020-01-09T15:45:59.194Z'
  },
  {
    id: 70,
    dateJoined: '2020-02-16T13:36:07.600Z',
    lastLogin: '2020-03-05T02:13:43.970Z'
  }
]
*/