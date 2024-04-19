import Syntaxe from '../../../dist/esm/index.js';

const sampleData = [
    { id: 1, text: "The quick    brown fox jumps  over the   lazy dog", status: 'Active' },
    { id: 2, text: "Pack  my box with five   dozen liquor  jugs.", status: 'Inactive' },
];

/*
- Return just id and text for each object in the array
- Rename id as userId
- For text
    - Replace any occurrence of multiple whitespace with single whitespace
*/

const sx = new Syntaxe({
    data: sampleData,
    schema: `{
        id [as:"userId"]
        text [rew:" "]
    }`
});

await sx.query();

/*
Result:
[
  { userId: 1, text: 'The quick brown fox jumps over the lazy dog' },
  { userId: 2, text: 'Pack my box with five dozen liquor jugs.' }
]
*/