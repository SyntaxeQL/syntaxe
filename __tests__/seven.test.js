import Syntaxe from '../dist/esm/index.js';
import appUsers from '../data/app-users.js';

test(`Return id and lastLogin as date of data where:
    - package is 'pro'
    - lastLogin date of week is 'Monday'
    - lastLogin month day is between 15th and 31st, and
    - lastLogin occurred in the last 9 months
    To equal [ 
        { id: 85, date: '2023-09-25T17:05:28.857Z' } 
    ]`, async() => {
    const sx = new Syntaxe({
        data: appUsers,
        schema: `{
            id
            package? [eq:"pro"]
            lastLogin [as:"date"] [dweq:"Monday"] [dinrange:[15,31]] [ago:"+ 9 months"]
        }`
    });
    expect(await sx.query()).toEqual([
        { id: 85, date: '2023-09-25T17:05:28.857Z' }
    ]);
});