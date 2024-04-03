import Syntaxe from '../dist/index.min.js';
import appUsers from '../data/app-users.js';

test(`Return id and lastLogin as date of data where:
    - lastLogin date of week is 'Monday'
    - lastLogin month is 'January'
    - lastLogin month day is between 1st and 20th
    - lastLogin year is 2024
    To equal [ 
        { id: 56, date: '2023-01-02T01:18:59.491Z' } 
    ]`, async() => {
    const sx = new Syntaxe({
        data: appUsers,
        schema: `{
            id
            lastLogin [as:"date"] [dweq:"Monday"] [meq:"Jan"] [dinrange:[1,20]] [year:2024]
        }`
    });
    expect(await sx.query()).toEqual([
        { id: 56, date: '2023-01-02T01:18:59.491Z' }
    ]);
});