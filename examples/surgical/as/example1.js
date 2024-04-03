import Syntaxe from '../../../dist/index.min.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id for each object in the array
- Rename id as userId
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [as:"userId"]
    }`
});

await sx.query();

/*
Result:
[
  { userId: 1 },
  { userId: 2 },
  { userId: 3 },
  { userId: 4 },
  { userId: 5 }
]
*/