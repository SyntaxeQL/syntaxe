import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status, langs and loggedInFrom for each object in the array
- Rename id as userId
- Rename langs as languages
- Return last entry for languages
- For loggedInFrom
  - Return cities
  - Rename cities as city
  - Return last entry for city
  - Rename loggedInFrom as lastCityLoggedInFrom
  - Return last entry for lastCityLoggedInFrom
- Return last 2 entries for parent array 
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [as:"userId"]
        status
        langs [as:"languages"] [last]
        loggedInFrom {
            cities [as:"city"] [last]
        } [as:"lastCityLoggedInFrom"] [last]
    } [last:2]`
});

await sx.query();

/*
Result:
[
  {
    userId: 4,
    status: 'active',
    languages: 'Korean',
    lastCityLoggedInFrom: { city: 'London' }
  },
  {
    userId: 5,
    status: 'inactive',
    languages: 'Korean',
    lastCityLoggedInFrom: { city: 'New York' }
  }
]
*/