import Syntaxe from '../dist/index.min.js';
import appUsers from '../data/app-users.js';

test(`Return id and lastLogin as date of data where:
    - package is 'pro'
    - lastLogin date of week is between 'Monday' and 'Thursday'
    - lastLogin month day is between 20th and 30th
    - lastLogin occurred between 9 months and 2 years ago, and
    - lastLogin time is greater than 10 am
    To equal [ 
        { id: 75, date: '2022-06-29T22:43:49.856Z' } 
    ]`, async() => {
    const sx = new Syntaxe({
        data: appUsers,
        schema: `{
            id
            package? [eq:"pro"]
            lastLogin [as:"date"] [dwinrange:["Monday", "Thur"]] [dinrange:[20,30]] [agoin:["9months", "2years"]] [tgt:"10:00:00"]
        }`
    });
    expect(await sx.query()).toEqual([
        { id: 75, date: '2022-06-29T22:43:49.856Z' }
    ]);
});