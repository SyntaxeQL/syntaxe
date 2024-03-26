import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName and lastLogin for each object in the array
- For lastLogin
    - Date must greater than or equal to the provided date value
    - Hour must match the provided hour
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        lastLogin [dtgte:"${new Date("2023-08-01")}"] [heq:20]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 5,
    fullName: 'Person 5',
    lastLogin: '2023-08-17T19:53:58.397Z'
  }
]
*/