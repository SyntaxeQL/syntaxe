import Syntaxe from '../../../dist/index.min.js';
import appUsers from '../../../data/app-users.js';

/*
- Return id and lastLogin for each object in the array
- lastLogin must have a month that matches at least one entry in the provided month array and also match the provided year
*/

const sx = new Syntaxe({
    data: appUsers,
    schema: `{
        id
        lastLogin [min:["Feb", "Apr", "Jul", "Nov"]] [yeq:2024]
    }`
});

await sx.query();

/*
Result:
[
  { id: 68, lastLogin: '2024-02-08T10:00:20.827Z' },
  { id: 89, lastLogin: '2024-02-03T18:24:47.166Z' }
]
*/