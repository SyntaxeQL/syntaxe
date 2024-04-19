import Syntaxe from '../../../dist/esm/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id for each object in the array where the id is 1, 3 or 5
- For loggedInFrom
    - Return country and cities
    - Return the object if country is anything except 'Uk' or 'Canada'
    - Rename cities as city
    - Return first entry for city
    - Return distinct objects for loggedInFrom filtered by country
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [nin:[1, 3, 5]]
        loggedInFrom? {
            country [nin:["UK", "Canada"]]
            cities [as:"city"] [first]
        } [dist:"country"]
    }`
});

await sx.query();

/*
Result:
[ { id: 2 }, { id: 4 } ]
*/