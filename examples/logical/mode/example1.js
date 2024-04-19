import Syntaxe from '../../../dist/esm/index.js';
import appUsers from '../../../data/app-users.js';

// MODE operator is applied to object bodies

// Please note that even when the [mode] operator is not explicitly used, it is still applied, with its default value set to 'and'
// Meaning all operations associated with all properties of the object must evaluate to true for the object to be returned
// Adding the mode operator such as [mode:"or"] means at least one property of all properties that have operations must have its operations evaluate to true 

/*
- Return id and dateJoined for each object in the array
- package must be 'premium'
- For dateJoined (condition - and)
    - The date must match anything between 2 years ago AND BEFORE THAT (back-dating)
    - The year must be less than 2000
    - The day of week must be 'Sunday'
    - All the above operations and conditions MUST evaluate to true
- Return the first 5 entries for the parent array
- At least one property of all properties with operations in the object must have its operations evaluate to true 
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id 
        package? [eq:"premium"]
        dateJoined [ago:"-2years"] [ylt:2000] [dweq:"Sunday"]
    } [first:5] [mode:"or"]`
});

await sx.query();

/*
Result:
[
  { id: 1, dateJoined: '2016-01-03T12:08:32.968Z' },
  { id: 2, dateJoined: '2019-01-05T12:21:36.676Z' },
  { id: 3, dateJoined: '2022-08-06T22:17:06.108Z' },
  { id: 4, dateJoined: '2021-12-30T16:30:39.153Z' },
  { id: 5, dateJoined: '2021-07-23T17:29:37.640Z' }
]
*/