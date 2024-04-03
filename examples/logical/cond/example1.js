import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

// COND operator is applied to object properties

// Please note that even when the [cond] operator is not explicitly used, it is still applied, with its default value set to 'and'
// Meaning all operations associated with a property must evaluate to true
// Adding the cond operator such as [cond:"or"] means at least one operation of many possible operations associated with a property must evaluate to true

/*
- Return id and dateJoined for each object in the array
- package must be 'premium'
- For dateJoined (condition - and)
    - The date must match anything between 2 years ago AND BEFORE THAT (back-dating)
    - The year must be less than 2020
    - The day of week must be 'Monday' 
    - All the above operations and conditions MUST evaluate to true
- Return the first 5 entries for the parent array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        package? [eq:"premium"]
        dateJoined [ago:"-2years"] [ylt:2020] [dweq:"Monday"]
    } [first:5]`
});

await sx.query();

/*
Result:
[
  { id: 14, dateJoined: '2015-04-13T17:58:53.723Z' },
  { id: 58, dateJoined: '2016-12-05T04:46:20.511Z' }
]
*/