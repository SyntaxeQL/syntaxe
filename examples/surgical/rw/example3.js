import Syntaxe from '../../../dist/esm/index.js';

const sampleData = [
    { id: 1, text: "The quick    brown fox jumps  over the   lazy dog.", status: 'Active', mobileNo: "(614) 921-0044" },
    { id: 2, text: "Pack  my box with five   dozen liquor  jugs.", status: 'Inactive', mobileNo: "(803) 425-8670" },
];

/*
- Return just id, text and mobileNo for each object in the array
- For text
  - Replace any occurrence of multiple whitespace with single whitespace
- Rename mobileNo as phone
- Replace whitespace in phoneNo with hyphen '-'
*/

const sx = new Syntaxe({
    data: sampleData,
    schema: `{
        id
        text [rew:" "]
        mobileNo [as:"phoneNo"] [rw:"-"]
    }`
});

await sx.query();

/*
Result:
[
  {
    id: 1,
    text: 'The quick brown fox jumps over the lazy dog.',
    phoneNo: '(614)-921-0044'
  },
  {
    id: 2,
    text: 'Pack my box with five dozen liquor jugs.',
    phoneNo: '(803)-425-8670'
  }
]
*/