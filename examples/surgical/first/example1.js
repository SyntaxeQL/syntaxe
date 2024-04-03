import Syntaxe from '../../../dist/index.min.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status and langs for each object in the array
- Rename id as userId
- Rename langs as languages
- Return first entry for languages
- Return first entry for parent array
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [as:"userId"]
        status
        langs [as:"languages"] [first]
    } [first]`
});

await sx.query();

/*
Result: { userId: 1, status: 'active', languages: 'English' }
*/