import Syntaxe from '../../../dist/index.min.js';

/*
Replace any occurrence of whitespace with no space
*/

const sx = new Syntaxe({
    data: "(978) 887-5589",
    schema: `[rw]`
});

await sx.query();

/*
Result: (978)887-5589
*/