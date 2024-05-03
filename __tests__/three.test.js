import Syntaxe from '../dist/esm/index.js';
import appUsersLite from '../data/app-users-lite.js';

test(`Return id fullName as name for the last entry of data where package is 'free'.
    To equal { id: 5, name: 'Person 5' }`, async() => {
    const sx = new Syntaxe({
        data: appUsersLite,
        schema: `{
            id
            fullName [as:"name"]
            package? [eq:"free"]
        } [last]`
    });
    expect(await sx.query()).toEqual({ id: 5, name: 'Person 5' });
});