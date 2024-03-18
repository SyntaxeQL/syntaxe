import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

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