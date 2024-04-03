import Syntaxe from '../dist/index.min.js';

test(`compute size of [1,2,3,4,5] to equal 5`, async() => {
    const data = [1,2,3,4,5];
    const sx = new Syntaxe({
        data,
        schema: `[size]`
    });
    expect(await sx.query()).toBe(data.length);
});