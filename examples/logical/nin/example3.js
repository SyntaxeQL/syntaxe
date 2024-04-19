import Syntaxe from '../../../dist/esm/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName, package, status and loggedInFrom for each object in the array
- Rename id as userId
- id must be greater than 50
- Rename fullName as name
- package must match anything except 'free' or 'premium'
- status must be 'under review'
- For loggedInFrom
    - Return country and cities
    - Return the object if country is not 'Uk' or 'Canada'
    - Rename cities as city
    - Return first entry for city
    - Return last entry for the loggedInFrom
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id [as:"userId"] [gt:50]
        fullName [as:"name"]
        package [nin:["free", "premium"]]
        status [eq:"under review"]
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
    "userId": 53,
    "name": "Person 53",
    "package": "pro",
    "status": "under review",
    "loggedInFrom": []
  },
  {
    "userId": 55,
    "name": "Person 55",
    "package": "pro",
    "status": "under review",
    "loggedInFrom": []
  },
  {
    "userId": 61,
    "name": "Person 61",
    "package": "pro",
    "status": "under review",
    "loggedInFrom": {"country": "USA", "city": "Houston"}
  },
  {
    "userId": 67,
    "name": "Person 67",
    "package": "pro",
    "status": "under review",
    "loggedInFrom": {"country": "USA", "city": "Chicago"}
  },
  {
    "userId": 76,
    "name": "Person 76",
    "package": "pro",
    "status": "under review",
    "loggedInFrom": []
  },
  {
    "userId": 83,
    "name": "Person 83",
    "package": "pro",
    "status": "under review",
    "loggedInFrom": {"country": "USA", "city": "Houston"}
  },
  {
    "userId": 84,
    "name": "Person 84",
    "package": "pro",
    "status": "under review",
    "loggedInFrom": []
  }
]
*/