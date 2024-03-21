import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return just id, status and langs for each object in the array
- Rename id as userId
- Rename langs as languages
- Return size of the parent array as value
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id [as:"userId"]
        status 
        langs [as:"languages"]
    } [size]`
});

await sx.query();

/*
Result: 100
*/