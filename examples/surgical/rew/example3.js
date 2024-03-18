import Syntaxe from '../../../src/index.js';

const sx = new Syntaxe({
    data: "Pack  my box with five   dozen liquor  jugs.",
    schema: `[rew]`
});

await sx.query();

/*
Result: Packmy box with fivedozen liquorjugs.
*/