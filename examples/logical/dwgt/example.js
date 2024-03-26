import Syntaxe from '../../../src/index.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, package and dateJoined for each object in the array
- package must be 'free'
- For dateJoined 
    - Day of week must be greater than the provided day of week
    - Day must match the provided day range
    - Year must be greater than 2020 and also be less than 2024
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        package [eq:"free"]
        dateJoined [dwgt:"Mon"] [dinrange:[15, 30]] [ygt:2020] [ylt:2024]
    }`
});

await sx.query();

/*
Result:
[
  { id: 5, package: 'free', dateJoined: '2021-07-23T17:29:37.640Z' },
  { id: 29, package: 'free', dateJoined: '2021-01-30T01:29:12.520Z' },
  { id: 43, package: 'free', dateJoined: '2021-09-21T02:09:25.158Z' },
  { id: 45, package: 'free', dateJoined: '2021-05-25T20:41:23.387Z' },
  { id: 69, package: 'free', dateJoined: '2021-10-27T07:54:38.838Z' },
  { id: 95, package: 'free', dateJoined: '2022-07-21T05:54:44.121Z' }
]
*/