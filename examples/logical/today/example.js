import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id and dateJoined for each object in the array
- dateJoined must match the today's date
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        dateJoined [today]
    }`
});

await sx.query();

/*
Result: []
*/