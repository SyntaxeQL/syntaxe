import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

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