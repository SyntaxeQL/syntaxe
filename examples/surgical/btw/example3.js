import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

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