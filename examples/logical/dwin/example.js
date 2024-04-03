import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id, package and dateJoined for each object in the array
- package must be 'free'
- For dateJoined 
    - Day of week must match at least one entry in the provided array
    - Day must match the provided day range
    - Year must be greater than 2020 and also be less than 2024
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        package [eq:"free"]
        dateJoined [dwin:["Wed", "Thursday", "Friday"]] [dinrange:[15, 30]] [ygt:2020] [ylt:2024]
    }`
});

await sx.query();

/*
Result:
[
  { id: 5, package: 'free', dateJoined: '2021-07-23T17:29:37.640Z' },
  { id: 69, package: 'free', dateJoined: '2021-10-27T07:54:38.838Z' },
  { id: 95, package: 'free', dateJoined: '2022-07-21T05:54:44.121Z' }
]
*/