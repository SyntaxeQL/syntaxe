import Syntaxe from '../../../src/index.js';

const sampleData = [
    { id: 1, text: "The quick    brown fox jumps  over the   lazy dog.", status: 'Active', mobileNo: "(614) 921-0044" },
    { id: 2, text: "Pack  my box with five   dozen liquor  jugs.", status: 'Inactive', mobileNo: "(803) 425-8670" },
];

/*
- Return just id, text and mobileNo for each object in the array
- Rename id as userId
- For text
  - Replace any occurrence of multiple whitespace with single whitespace
- Rename mobileNo as phone
- Replace whitespace in phone with no space
*/

const sx = new Syntaxe({
    data: sampleData,
    schema: `{
        id [as:"userId"]
        text [rew:" "]
        mobileNo [as:"phone"] [rw]
    }`
});

await sx.query();

/*
Result:
[
  {
    userId: 1,
    text: 'The quick brown fox jumps over the lazy dog.',
    phone: '(614)921-0044'
  },
  {
    userId: 2,
    text: 'Pack my box with five dozen liquor jugs.',
    phone: '(803)425-8670'
  }
]
*/