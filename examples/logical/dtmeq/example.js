import Syntaxe from '../../../dist/index.min.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName and dateJoined for each object in the array
- dateJoined must match at least one of the two provided date/time values
*/

const dateJoined1 = new Date(2016, 0, 3, 13, 8, 32);
const dateJoined2 = new Date("2022-08-06 22:10:00");

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        dateJoined [dtmeq:"${dateJoined1}"] [dtmeq:"${dateJoined2}"] [cond:"or"]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 1,
    fullName: 'Person 1',
    dateJoined: '2016-01-03T12:08:32.968Z'
  }
]
*/