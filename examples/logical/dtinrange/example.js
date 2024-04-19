import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName, dateJoined and lastLogin for each object in the array
- Object is returned if dateJoined matches the provided range of date values and
- If lastLogin matches the provided range of date values
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        dateJoined [dtinrange:["${new Date("2022-08-06")}", "${new Date()}"]]
        lastLogin [dtinrange:["${new Date("2023-08-01")}", "${new Date()}"]]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 3,
    fullName: 'Person 3',
    dateJoined: '2022-08-06T22:17:06.108Z',
    lastLogin: '2023-08-29T04:31:09.580Z'
  }
]
*/