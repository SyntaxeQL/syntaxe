import Syntaxe from '../dist/index.min.js';
import appUsers from '../data/app-users.js';

test(`Return id and package for entries 7 to 9 of data where package is not 'free'.
    To equal [
        { id: 13, package: 'pro' },
        { id: 14, package: 'premium' },
        { id: 15, package: 'pro' }
    ]`, async() => {
    const sx = new Syntaxe({
        data: appUsers,
        schema: `{
            id
            package [ne:"free"]
        } [btw:[7,9]]`
    });
    expect(await sx.query()).toEqual([
        { id: 13, package: 'pro' },
        { id: 14, package: 'premium' },
        { id: 15, package: 'pro' }
    ]);
});