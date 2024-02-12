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

A schema can be object-like if the data contains object(s), such as `[{..},{..}]` or `{..}`, or it can be in-line for both object and flat data, like `[1, 2, ..., n]`. Additionally, it may incorporate one or more operators (just key or key-value pair), such as `[first]`, `[gt:2]`, `[ago:5m]` and so on, which assist in tailoring the result to your requirements.

To compose a proper schema, it is essential to always enclose it within backtick symbols (`) to denote its scope.

### Schema examples

```js
import Syntaxe from "syntaxe";

const response = await fetch('https://api.github.com/users');
const users = await response.json();

const sx = new Syntaxe({
  data: users
});

/*
Object-like schema
1. Extract the specified properties of each object in the array (id, login, type and site_admin)
2. For each object, rename 'login' to 'username' - [as:"username"] 
3. Return the first two entries - [first:2] 
*/
const olSchemaResult = await sx.query({
    schema: `{
        id
        login[as:"username"]
        type
        site_admin
    }[first:2]`
});
console.log(olSchemaResult);
/*
Result is based on the current state of the data as returned by 'https://api.github.com/users'

Output:
[
  { id: 1, username: 'mojombo', type: 'User', site_admin: false },
  { id: 2, username: 'defunkt', type: 'User', site_admin: false }
]
*/


/* OR */


/*
In-line
1. Extract the entries from index 2 to index 8
2. Return the size of the extracted data, if it is greater than 4
*/
const inSchemaResult = await sx.query({
    schema: `[btw:[2,8]][size][gt:4]`
});
console.log(inSchemaResult); // Output: 6
/*
Result is based on the current state of the data as returned by 'https://api.github.com/users'
*/
```
