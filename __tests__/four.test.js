import Syntaxe from '../dist/esm/index.js';
import appUsers from '../data/app-users.js';

test(`Return size of data where package is not 'free'.
    To equal 60`, async() => {
    const sx = new Syntaxe({
        data: appUsers,
        schema: `{
            package [ne:"free"]
        } [size]`
    });
    expect(await sx.query()).toBe(60);
});