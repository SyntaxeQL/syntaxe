import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName, package, status, dateJoined and loggedInFrom for each object in the array
- Rename id as userId
- Rename fullName as name
- dateJoined must match at least one of the two provided date values
- For loggedInFrom
    - Return country and cities
    - Return the object if country is not 'Uk' or 'Canada'
    - Rename cities as city
    - Return first entry for city
    - Return last entry for the loggedInFrom
*/

const dateJoined1 = new Date("2016-01-03");
const dateJoined2 = new Date("2022-08-06");

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id [as:"userId"]
        fullName [as:"name"]
        package
        status
        dateJoined [dteq:"${dateJoined1}"] [dteq:"${dateJoined2}"] [cond:"or"]
        loggedInFrom {
            country [nin:["UK", "Canada"]]
            cities [as:"city"] [first]
        } [last]
    }`
});

await sx.query();

/*
Result:
[
  {
    "userId": 1,
    "name": "Person 1",
    "package": "free",
    "status": "active",
    "dateJoined": "2016-01-03T12:08:32.968Z",
    "loggedInFrom": []
  },
  {
    "userId": 3,
    "name": "Person 3",
    "package": "premium",
    "status": "under review",
    "dateJoined": "2022-08-06T22:17:06.108Z",
    "loggedInFrom": []
  }
]
*/