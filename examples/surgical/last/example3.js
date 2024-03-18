import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

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