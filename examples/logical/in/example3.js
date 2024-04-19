import Syntaxe from '../../../dist/esm/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, fullName, package, status and loggedInFrom for each object in the array
- Rename id as userId
- id must be greater than or equal to 5 and less than or equal to 50
- Rename fullName as name
- package must match 'free' or 'premium'
- status must be 'under review'
- For loggedInFrom
    - Return country and cities
    - Return the object if country is 'Uk' or 'Canada'
    - Rename cities as city
    - Return first entry for city
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id [as:"userId"] [gte:5] [lte:50]
        fullName [as:"name"]
        package [in:["free", "premium"]]
        status [eq:"under review"]
        loggedInFrom {
            country [in:["UK", "Canada"]]
            cities [as:"city"] [first]
        } [last]
    }`
});

await sx.query();

/*
Result:
[
  {
    "userId": 9,
    "name": "Person 9",
    "package": "free",
    "status": "under review",
    "loggedInFrom": {
      "country": "Canada",
      "city": "Calgary"
    }
  },
  {
    "userId": 11,
    "name": "Person 11",
    "package": "free",
    "status": "under review",
    "loggedInFrom": {
      "country": "Canada",
      "city": "Ottawa"
    }
  },
  {
    "userId": 16,
    "name": "Person 16",
    "package": "free",
    "status": "under review",
    "loggedInFrom": {
      "country": "UK",
      "city": "Manchester"
    }
  },
  {
    "userId": 45,
    "name": "Person 45",
    "package": "free",
    "status": "under review",
    "loggedInFrom": {
      "country": "Canada",
      "city": "Calgary"
    }
  },
  {
    "userId": 46,
    "name": "Person 46",
    "package": "free",
    "status": "under review",
    "loggedInFrom": {
      "country": "Canada",
      "city": "Ottawa"
    }
  }
]
*/