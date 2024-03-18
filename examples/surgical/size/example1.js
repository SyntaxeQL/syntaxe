import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

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