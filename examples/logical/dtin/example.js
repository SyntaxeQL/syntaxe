import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName, dateJoined and lastLogin for each object in the array
- Object is returned if dateJoined matches at least one of the entries in the provided list of date values and
- If lastLogin is greater than or equal to the provided date value
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        dateJoined [dtin:["${new Date("2022-08-06")}", "${new Date("2021-07-23")}", "${new Date("2016-01-03")}"]]
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
  },
  {
    id: 5,
    fullName: 'Person 5',
    dateJoined: '2021-07-23T17:29:37.640Z',
    lastLogin: '2023-08-17T19:53:58.397Z'
  }
]
*/