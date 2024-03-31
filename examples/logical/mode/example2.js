import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id and dateJoined for each object in the array
- package must be 'premium'
- For dateJoined (condition - and)
    - The date must match anything between 2 years ago AND BEFORE THAT (back-dating)
    - The year must be less than 2000
    - The day of week must be 'Sunday'
    - All the above operations and conditions MUST evaluate to true
- Return the first 5 entries for the parent array
- All properties with operations in the object must have their operations evaluate to true (same as default mode)
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id 
        package? [eq:"premium"]
        dateJoined [ago:"-2years"] [ylt:2000] [dweq:"Sunday"]
    } [first:5] [mode:"and"]`
});

await sx.query();

/*
Result: []
*/