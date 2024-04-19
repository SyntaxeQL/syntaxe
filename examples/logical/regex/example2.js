import Syntaxe from '../../../dist/esm/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName, package, status and loggedInFrom for each object in the array
- Rename id as userId
- id must be greater than 30
- Rename fullName as name
- package must must begin with the 'p' alphabet (case-insensitive)
- status must not be 'under review'
- For loggedInFrom
    - Return country and cities
    - Return the object if country begins with the 'u' alphabet (case-insensitive)
    - Rename cities as city
    - Return first entry for city
    - Return last entry for the loggedInFrom
- Return the first 10 entries for the parent array
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id [as:"userId"] [gt:30]
        fullName [as:"name"]
        package [regex:/^p/i]
        status [ne:"under review"]
        loggedInFrom {
            country [regex:/^u/i]
            cities [as:"city"] [first]
        } [last]
    } [first:10]`
});

await sx.query();

/*
Result:
[
  {
    "userId": 32,
    "name": "Person 32",
    "package": "pro",
    "status": "active",
    "loggedInFrom": []
  },
  {
    "userId": 36,
    "name": "Person 36",
    "package": "pro",
    "status": "inactive",
    "loggedInFrom": {"country": "UK", "city": "Birmingham"}
  },
  {
    "userId": 37,
    "name": "Person 37",
    "package": "pro",
    "status": "inactive",
    "loggedInFrom": []
  },
  {
    "userId": 38,
    "name": "Person 38",
    "package": "pro",
    "status": "inactive",
    "loggedInFrom": {"country": "USA", "city": "Los Angeles"}
  },
  {
    "userId": 39,
    "name": "Person 39",
    "package": "pro",
    "status": "inactive",
    "loggedInFrom": {"country": "UK", "city": "Glasgow"}
  },
  {
    "userId": 44,
    "name": "Person 44",
    "package": "premium",
    "status": "active",
    "loggedInFrom": {"country": "UK", "city": "Manchester"}
  },
  {
    "userId": 47,
    "name": "Person 47",
    "package": "premium",
    "status": "active",
    "loggedInFrom": {"country": "UK", "city": "Liverpool"}
  },
  {
    "userId": 49,
    "name": "Person 49",
    "package": "premium",
    "status": "inactive",
    "loggedInFrom": {"country": "USA", "city": "Houston"}
  },
  {
    "userId": 50,
    "name": "Person 50",
    "package": "premium",
    "status": "active",
    "loggedInFrom": []
  },
  {
    "userId": 51,
    "name": "Person 51",
    "package": "pro",
    "status": "inactive",
    "loggedInFrom": {"country": "UK", "city": "Glasgow"}
  }
]
*/