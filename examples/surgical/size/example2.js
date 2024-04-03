import Syntaxe from '../../../dist/index.min.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status, langs and loggedInFrom for each object in the array
- Rename status as userStatus
- Rename langs as languages
- Return size of languages as its value
- Rename loggedInFrom as citiesUserLoggedInFrom
- Return size of citiesUserLoggedInFrom as its value 
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        status [as:"userStatus"]
        langs [as:"languages"] [size]
        loggedInFrom [as:"citiesUserLoggedInFrom"] [size]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 1,
    userStatus: 'active',
    languages: 1,
    citiesUserLoggedInFrom: 2
  },
  {
    id: 2,
    userStatus: 'under review',
    languages: 1,
    citiesUserLoggedInFrom: 4
  },
  {
    id: 3,
    userStatus: 'under review',
    languages: 1,
    citiesUserLoggedInFrom: 2
  },
  {
    id: 4,
    userStatus: 'active',
    languages: 1,
    citiesUserLoggedInFrom: 1
  },
  {
    id: 5,
    userStatus: 'inactive',
    languages: 1,
    citiesUserLoggedInFrom: 2
  }
]
*/