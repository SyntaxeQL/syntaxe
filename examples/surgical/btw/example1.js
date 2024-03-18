import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [as:"userId"]
        status
        langs [as:"languages"] [first]
    } [btw:[2, 4]]`
});

await sx.query();

/*
Result:
[
  { userId: 3, status: 'under review', languages: 'English' },
  { userId: 4, status: 'active', languages: 'Korean' }
]
*/