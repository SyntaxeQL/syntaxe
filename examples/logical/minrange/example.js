import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id and lastLogin for each object in the array
- id must be greater than 50
- dateJoined must have a month that matches the provided month range
- lastLogin must match the provided year and also match the provided month
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id [gt:50]
        dateJoined? [minrange:["January", "June"]]
        lastLogin [yeq:2024] [meq:"Mar"]
    }`
});

await sx.query();

/*
Result:
[ { id: 59, lastLogin: '2024-03-06T12:25:26.831Z' } ]
*/