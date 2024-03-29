import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName and dateJoined for each object in the array
- Object is returned if dateJoined is greater than at least one of the provided date values 
*/

const dateJoined1 = new Date("2016-01-03");
const dateJoined2 = new Date("2022-08-01");

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        package?
        dateJoined [dtgt:"${dateJoined1}"] [dtgt:"${dateJoined2}"] [cond:"or"]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 2,
    fullName: 'Person 2',
    dateJoined: '2019-01-05T12:21:36.676Z'
  },
  {
    id: 3,
    fullName: 'Person 3',
    dateJoined: '2022-08-06T22:17:06.108Z'
  },
  {
    id: 4,
    fullName: 'Person 4',
    dateJoined: '2021-12-30T16:30:39.153Z'
  },
  {
    id: 5,
    fullName: 'Person 5',
    dateJoined: '2021-07-23T17:29:37.640Z'
  }
]
*/