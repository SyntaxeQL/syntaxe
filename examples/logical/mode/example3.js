import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, dateJoined and loggedInFrom for each object in the array
- package must be anything except 'premium'
- For dateJoined (condition - and)
    - The date must match anything between 2 years ago AND BEFORE THAT (back-dating)
    - The year must be less than 2000
    - The day of week must be 'Sunday'
    - All the above operations and conditions MUST evaluate to true
- For loggedInFrom (condition - and)
    - The country must be 'canada' (case-insensitive)
    - The size of cities must be greater than 2
    - All the above operations and conditions MUST evaluate to true
    - Compute distinct values using country as filter
    - Return if size is greater than 1  
- Return the first 5 entries for the parent array
- Return the last 2 entries of the 5 entries returned
- At least one property of all properties with operations in the object must have its operations evaluate to true 
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id [gt:10]
        package? [ne:"premium"]
        dateJoined [ago:"-2years"] [ylt:2000] [dweq:"Sunday"]
        loggedInFrom {
            country [eqi:"canada"]
            cities [sgt:2]
        } [dist:"country"] [sgt:1]
    } [first:5] [last:2] [mode:"or"]`
});

await sx.query();

/*
Result:
[
  { id: 4, dateJoined: '2021-12-30T16:30:39.153Z', loggedInFrom: [] },
  { id: 5, dateJoined: '2021-07-23T17:29:37.640Z', loggedInFrom: [] }
]
*/