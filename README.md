Syntaxe

[![MIT licensed](https://img.shields.io/badge/license-MIT-0091F7)](./LICENSE)
![NPM Version](https://img.shields.io/badge/npm-v1.1.1-D50100)
![Top Language](https://img.shields.io/badge/javascript-100%25-F0DC4E)

<br/>

## Introduction 🧋

_Syntaxe is data query library inspired by mongodb and graphql._

Syntaxe, with the help of a schema, can be used to perform any number of query operations on most types of data e.g. String, Object or Array.

# Installation

## Setup 💾

```bash
npm install syntaxe
```

# Example

### A basic example

```js
import Syntaxe from "syntaxe";

const sx = new Syntaxe({
  data: [1,2,3],
  schema: `[size]`
});

/* Promise */
sx.query().then(console.log); // Output: 3

/* OR */

/* Await */
const result = await sx.query();
console.log(result); // Output: 3

```
# Usage

## Schema ✍🏽️

### Wotsa Skee-ma-ah?

_If your data was yourself, then the schema would likely be or look like your reflection._

In syntaxe, the schema dictates how you query your data, representing its structure to be returned or the computed result of the data.

A schema can be object-like if the data contains object(s), such as `[{..},{..}]` or `{..}`, or it can be inline if the data is flat, like `[1, 2, ..., n]`. Additionally, it may incorporate one or more operators (just key or key-value pair), such as `[first]`, `[gt:2]`, `[ago:5m]` and so on, which assist in tailoring the result to your requirements.

To compose a proper schema, it is essential to always enclose it within backtick symbols (`) to denote its scope.
