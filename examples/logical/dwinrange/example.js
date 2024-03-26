import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, package, status and dateJoined for each object in the array
- package must be 'free'
- status must be 'active'
- For dateJoined 
    - Day of week must match the provided day of week range
    - Year must be greater than 2020 and also be less than 2024
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        package [eq:"free"]
        status [eq:"active"]
        dateJoined [dwinrange:["Mon", "Wed"]] [ygt:2020] [ylt:2024]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 43,
    package: 'free',
    status: 'active',
    dateJoined: '2021-09-21T02:09:25.158Z'
  }
]
*/