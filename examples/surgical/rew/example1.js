import Syntaxe from '../../../src/index.js';

/*
Replace any occurrence of multiple whitespace with single whitespace
*/

const sx = new Syntaxe({
    data: "The quick    brown fox jumps  over the   lazy dog",
    schema: `[rew:" "]`
});

await sx.query();

/*
Result: The quick brown fox jumps over the lazy dog
*/