import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status and loggedInFrom for each object in the array
- For loggedInFrom
  - Return country and cities
  - Return the first entry for cities
  - Rename cities as city
  - The object containing country and city should be returned only if the city is 'Vancouver'
- The parent object is returned only if the size of loggedInFrom is greater than 0
- Return the first three entries for parent array after all operations
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [as:"userId"] [gt:4]
        status
        loggedInFrom {
            country
            cities [first] [as:"city"] [eq:"Vancouver"]
        } [size] [gt:0]
    } [first:3]`
});

await sx.query();

/*
Result: []
*/