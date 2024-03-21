import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id and loggedInFrom for each object in the array
- Rename id as userId
- For loggedInFrom
  - Return country and cities
  - Return first entry for cities
  - Rename cities as city
  - Return last entry for loggedInFrom
  - Rename loggedInFrom as lastCountryAndCity
- Return entries 1 to 4
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [as:"userId"]
        loggedInFrom {
            country
            cities [first] [as:"city"]
        } [last] [as:"lastCountryAndCity"]
    } [btw:4]`
});

await sx.query();

/*
Result:
[
  {
    userId: 1,
    lastCountryAndCity: { country: 'Canada', city: 'Vancouver' }
  },
  {
    userId: 2,
    lastCountryAndCity: { country: 'USA', city: 'New York' }
  },
  {
    userId: 3,
    lastCountryAndCity: { country: 'Canada', city: 'Montreal' }
  },
  { userId: 4, lastCountryAndCity: { country: 'UK', city: 'London' } }
]
*/