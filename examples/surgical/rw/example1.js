import Syntaxe from '../../../src/index.js';

const sx = new Syntaxe({
    data: "(978) 887-5589",
    schema: `[rw]`
});

await sx.query();

/*
Result: (978)887-5589
*/