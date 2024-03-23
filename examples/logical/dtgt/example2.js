import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName, package and dateJoined for each object in the array
- Object is returned if dateJoined is greater than both provided date values 
*/

const dateJoined1 = new Date("2016-01-03");
const dateJoined2 = new Date("2022-08-01");

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        package
        dateJoined [dtgt:"${dateJoined1}"] [dtgt:"${dateJoined2}"]
    }`
});

await sx.query();

/*
Result:
[
  {
    "id": 3,
    "fullName": "Person 3",
    "package": "premium",
    "dateJoined": "2022-08-06T22:17:06.108Z"
  }
]
*/