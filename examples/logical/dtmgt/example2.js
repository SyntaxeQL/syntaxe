import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName, status, dateJoined and lastLogin for each object in the array
- id must be greater than 2
- status must not match the regular expression 'review'
- dateJoined must be greater than the provided date/time value
- lastLogin must be less than today
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [gt:2]
        fullName
        status [regexne:/review/]
        dateJoined [dtmgt:"${new Date(2016, 0, 3, 13, 0, 0)}"]
        lastLogin [dtlt:"${new Date()}"]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 4,
    fullName: 'Person 4',
    status: 'active',
    dateJoined: '2021-12-30T16:30:39.153Z',
    lastLogin: '2022-07-16T11:07:33.433Z'
  },
  {
    id: 5,
    fullName: 'Person 5',
    status: 'inactive',
    dateJoined: '2021-07-23T17:29:37.640Z',
    lastLogin: '2023-08-17T19:53:58.397Z'
  }
]
*/