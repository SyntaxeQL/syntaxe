import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return id, fullName and dateJoined for each object in the array
- dateJoined must be greater than the provided date/time value
*/

const dateJoined = new Date(2022, 0, 3, 13, 0, 0);

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id
        fullName
        status
        dateJoined [dtmgt:"${dateJoined}"]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 3,
    fullName: 'Person 3',
    status: 'under review',
    dateJoined: '2022-08-06T22:17:06.108Z'
  }
]
*/