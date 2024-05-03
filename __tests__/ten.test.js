import Syntaxe from '../dist/esm/index.js';
import appUsers from '../data/app-users.js';

test(`Return id, dateJoined as joined and lastLogin as date of data for the last entry where:
    - id is greater than 10 and less than 50
    - package is 'pro'
    - dateJoined month is 'June'
    - dateJoined day of week is 'Saturday'
    - lastLogin date of week is between 'Monday' and 'Thursday'
    - lastLogin month day is between 20th and 30th
    - lastLogin occurred between 9 months and 2 years ago
    - Mode is 'or' (At least one property with operations must have its operations evaluate to true)
    To equal {
        id: 97,
        joined: '2019-05-01T22:43:07.715Z',
        date: '2024-01-06T09:11:15.046Z'
    }`, async() => {
    const sx = new Syntaxe({
        data: appUsers,
        schema: `{
            id [gt:10] [lt:50]
            package? [eq:"pro"]
            dateJoined [meq:"June"] [dweq:"Sat"] [as:"joined"]
            lastLogin [as:"date"] [dwinrange:["Monday", "Thur"]] [dinrange:[20,30]] [agoin:["9months", "2years"]]
        } [mode:"or"] [last]`
    });
    expect(await sx.query()).toEqual({
        id: 97,
        joined: '2019-05-01T22:43:07.715Z',
        date: '2024-01-06T09:11:15.046Z'
    });
});