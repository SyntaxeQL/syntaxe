import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

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