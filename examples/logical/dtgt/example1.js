import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName, package and dateJoined for each object in the array
- Object is returned if dateJoined matches at least one of the two provided date values
*/

const dateJoined = new Date("2016-01-03");

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        package
        dateJoined [dtgt:"${dateJoined}"]
    }`
});

await sx.query();

/*
Result:
[
  {
    "id": 2,
    "fullName": "Person 2",
    "package": "free",
    "dateJoined": "2019-01-05T12:21:36.676Z"
  },
  {
    "id": 3,
    "fullName": "Person 3",
    "package": "premium",
    "dateJoined": "2022-08-06T22:17:06.108Z"
  },
  {
    "id": 4,
    "fullName": "Person 4",
    "package": "pro",
    "dateJoined": "2021-12-30T16:30:39.153Z"
  },
  {
    "id": 5,
    "fullName": "Person 5",
    "package": "free",
    "dateJoined": "2021-07-23T17:29:37.640Z"
  }
]
*/