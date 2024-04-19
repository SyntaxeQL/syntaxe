import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status and langs for each object in the array
- Rename id as userId
- Rename langs as languages
- Return the first entry for languages
- Return entries 2 to 4
*/

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
  { userId: 2, status: 'under review', languages: 'Japanese' },
  { userId: 3, status: 'under review', languages: 'English' },
  { userId: 4, status: 'active', languages: 'Korean' }
]
*/