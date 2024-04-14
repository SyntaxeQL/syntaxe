# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2024-04-14

### Added

New class properties to hold the status values for a query.
- `success` - contains the status of the query. Value can be `true` or `false`.
- `error` - contains some information on why the query failed.

### Example
```js
import Syntaxe from "syntaxe";

const sx = new Syntaxe({
  data: [1,2,3],
  schema: `[size]`
});

sx.query().then((result) => {
  if (sx.success) {
    // Do something with result
  } else {
    let error = sx.error;
  }
});
```

## [1.2.0] - 2024-04-06

### Added

- TypeScript support.

## [1.0.1] - 2024-04-06

### Added

- Initial release of the project.
- Implemented basic functionality.
