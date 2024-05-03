import Syntaxe from '../dist/esm/index.js';
import appUsers from '../data/app-users.js';

test(`Return id and lastLogin as date of data for the first entry where:
    - id is greater than 10 and less than 50
    - package is 'pro' or 'premium'
    - lastLogin date of week is between 'Monday' and 'Thursday'
    - lastLogin month day is between 20th and 30th
    - lastLogin occurred between 9 months and 2 years ago
    To equal { id: 47, date: '2023-05-25T12:38:16.347Z' }`, async() => {
    const sx = new Syntaxe({
        data: appUsers,
        schema: `{
            id [gt:10] [lt:50]
            package? [eq:"pro"] [eq:"premium"] [cond:"or"]
            lastLogin [as:"date"] [dwinrange:["Monday", "Thur"]] [dinrange:[20,30]] [agoin:["9months", "2years"]]
        } [first]`
    });
    expect(await sx.query()).toEqual({ 
        id: 47, 
        date: '2023-05-25T12:38:16.347Z' 
    });
});