import Syntaxe from '../../../dist/esm/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id and lastLogin for each object in the array
- dateJoined must match the provided month and also match the provided year
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        dateJoined? [meq:"Feb"] [yeq:2024]
        lastLogin
    }`
});

await sx.query();

/*
Result:
[ { id: 50, lastLogin: '2023-05-18T07:29:47.623Z' } ]
*/