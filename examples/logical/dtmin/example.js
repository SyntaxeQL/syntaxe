import Syntaxe from '../../../dist/index.min.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName, dateJoined and lastLogin for each object in the array
- Object is returned if dateJoined matches at least one of the entries in the provided list of date/time values and
- If lastLogin is greater than or equal to the provided date value
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        dateJoined [dtmin:["${new Date("2022-08-06 23:17:06")}", "${new Date("2021-07-23 15:34:10")}", "${new Date("2016-01-03 10:13:45")}"]]
        lastLogin [dtgte:"${new Date("2023-08-01")}"]
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