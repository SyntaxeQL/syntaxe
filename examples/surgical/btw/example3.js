import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status and loggedInFrom for each object in the array
- Rename status as activeStatus
- For loggedInFrom
  - Return cities
  - Rename cities as city
  - Return first entry for city
  - Rename loggedInFrom as cityInfo
  - Return last entry for cityInfo
- Return entries 3 to 5
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        status [as:"activeStatus"]
        loggedInFrom {
            cities [as:"city"] [first]
        } [as:"cityInfo"] [last]
    } [btw:[3, 5]]`
});

await sx.query();

/*
Result:
[
  { id: 4, activeStatus: 'active', cityInfo: { city: 'London' } },
  {
    id: 5,
    activeStatus: 'inactive',
    cityInfo: { city: 'Los Angeles' }
  }
]
*/