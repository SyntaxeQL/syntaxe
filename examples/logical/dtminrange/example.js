import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName, dateJoined and lastLogin for each object in the array
- Object is returned if dateJoined matches the provided range of date/time values and
- If lastLogin matches the provided range of date/time values
*/
const dtmValue1 = new Date(2024,2,5,23,59,50);
const dtmValue2 = new Date(2024,2,6,10,0,0);
const sx = new Syntaxe({
    // data: appUsersLite,
    // schema: `{
    //     id
    //     fullName
    //     dateJoined [dtminrange:["${new Date("2021-01-01 00:00:00")}", "${new Date()}"]]
    //     lastLogin [dtminrange:["${new Date("2021-01-01 00:10:00")}", "${new Date()}"]]
    // }`

    data: [
        {
          id: 1,
          status: 'success',
          statusDate: '3/6/2024 10:00:00'
        },
        {
          id: 2,
          status: 'failed',
          statusDate: '3/8/2024 10:00:00'
        }
      ],
      schema: `{
        statusDate
        [dtmnin:["${dtmValue1}",
          "${dtmValue2}"]]
      }`
});

// await sx.query();
console.log(await sx.query());

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
    id: 4,
    fullName: 'Person 4',
    dateJoined: '2021-12-30T16:30:39.153Z',
    lastLogin: '2022-07-16T11:07:33.433Z'
  },
  {
    id: 5,
    fullName: 'Person 5',
    dateJoined: '2021-07-23T17:29:37.640Z',
    lastLogin: '2023-08-17T19:53:58.397Z'
  }
]
*/