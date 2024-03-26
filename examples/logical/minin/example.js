import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName, status and lastLogin for each object in the array
- status must match at least one entry in the provided array
- For lastLogin
    - Year must match provided year range
    - Hour must match the provided hour range
    - Minute must match at least one entry in the provided minute array
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        status [in:["active", "pending"]]
        lastLogin [yinrange:[2020, 2024]] [hinrange:[10, 20]] [minin:[10, 15, 18, 32, 55]]
    }`
});

await sx.query();

/*
Result: []
*/