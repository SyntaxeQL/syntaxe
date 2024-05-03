import Syntaxe from '../dist/esm/index.js';
import appUsersLite from '../data/app-users-lite.js';

test(`Return id fullName as name and package for the first entry of data.
    To equal { id: 1, name: 'Person 1', package: 'free' }`, async() => {
    const sx = new Syntaxe({
        data: appUsersLite,
        schema: `{
            id
            fullName [as:"name"]
            package
        } [first]`
    });
    expect(await sx.query()).toEqual({ id: 1, name: 'Person 1', package: 'free' });
});