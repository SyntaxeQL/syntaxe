Syntaxe

[![MIT licensed](https://img.shields.io/badge/license-MIT-0091F7)](./LICENSE)
![NPM Version](https://img.shields.io/badge/npm-v1.1.1-D50100)
![Top Language](https://img.shields.io/badge/javascript-100%25-F0DC4E)

<br/>

## Introduction 🧋

_Syntaxe is a data query library inspired by mongodb and graphql._

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

_If your data were yourself, then the schema would likely be or look like your reflection._

In syntaxe, the schema determines how your data is queried. It represents the structure of the value to be returned or the computed result of the data.

A schema can be object-like if the data contains object(s), such as `[{..},{..}]` or `{..}`, or it can be in-line for any type of data. Additionally, it may incorporate one or more operators (just key or key-value pair), such as `[first]`, `[gt:2]`, `[ago:"5m"]` and so on, which assist in tailoring the result to your requirements.

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
Object schema
1. Extract the specified properties of each object in the array (id, login, type and site_admin)
2. For each object, rename 'login' as 'username' - [as:"username"] 
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
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

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
console.log(inSchemaResult);
/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Output: 6
*/
```
## Methods 🏒

### Class methods

<table>
<tr>
<td align="left">Method</td>
<td align="left">Description</td>
<td align="left">Usage</td>
<td align="left">Returns</td>
</tr>
<tr>
<td align="left">
  
`.data(data)`

</td>
<td align="left">This method is used to define the data to be queried.</td>
<td align="left">

```js
const useCase1 = new Syntaxe({
  schema: `[first]`
});
useCase1.data([1,2,3,4,5]);
```
  
</td>
<td align="left">Syntaxe object (useful for method chaining)</td>
</tr>
<tr>
<td align="left">
  
`.schema(schema)`

</td>
<td align="left">This nethod is used to define the schema for querying the data.</td>
<td align="left">

```js
const useCase1 = new Syntaxe({
  data: [1,2,3,4,5]
});
useCase1.schema(`[last:2]`);
```
  
</td>
<td align="left">Syntaxe object (useful for method chaining)</td>
</tr>

<tr>
<td align="left">
  
`.query()`

</td>
<td align="left">This is an asynchronous method that uses the defined schema to query the defined data.</td>
<td align="left">

```js
const useCase1 = new Syntaxe();
useCase1.data([1,2,3,4,5]);
useCase1.schema(`[btw:[2,4]]`);
const result = await useCase1.query();
```
  
</td>
<td align="left">

  Value: `Object`, `Array`, `String`, `Number` or `Boolean`

</td>
</tr>
</table>

### Method chaining

Syntaxe methods can be chained together to define the properties required to perform a query.

```js
const useCase1 = new Syntaxe();
const result = await useCase1
                      .data(['apple', 'banana', 'orange'])
                      .schema(`[last]`)
                      .query();
console.log(result); // Output: 'orange'
```

## Examples 🎮

### Use case 1 (Pass data and schema to the constructor)

```js
import Syntaxe from "syntaxe";

const response = await fetch('https://api.github.com/users');
const users = await response.json();

/*
Object schema
1. Extract the specified properties of each object in the array (id and login)
2. Return the first five entries - [first:5] 
*/
const useCase1 = new Syntaxe({
    data: users,
    schema: `{
        id
        login
    }[first:5]`
});
console.log(await useCase1.query());
/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Output:
[
  { id: 1, login: 'mojombo' },
  { id: 2, login: 'defunkt' },
  { id: 3, login: 'pjhyett' },
  { id: 4, login: 'wycats' },
  { id: 5, login: 'ezmobius' }
]
*/
```
### Use case 2 (Invoke the data and schema methods separately)

```js
import Syntaxe from "syntaxe";

const response = await fetch('https://api.github.com/users');
const users = await response.json();

/*
In-line schema
1. Return the size of the data - [size] 
*/
const useCase2 = new Syntaxe();
useCase2.data(users);
useCase2.schema(`[size]`);
console.log(await useCase2.query());
/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Output: 30
*/
```
### Use case 3 (Pass the data and schema when the query method is invoked)

```js
import Syntaxe from "syntaxe";

const response = await fetch('https://api.github.com/users');
const users = await response.json();

/*
Object schema
1. Extract the specified property of each object in the array (login)
2. For each object, rename 'login' as 'userId' - [as:"userId"]
3. Return the last entry - [last]
*/
const useCase3 = new Syntaxe();
const useCase3Result = await useCase3.query({
    data: users,
    schema: `{
        login[as:"userId"]
    }[last]`
});
console.log(useCase3Result);
/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Output:
{ userId: 'bmizerany' }
*/
```
### Use case 4 (Invoke the data method, pass the schema when query method is invoked, and invoke the schema method)

```js
import Syntaxe from "syntaxe";

const response = await fetch('https://api.github.com/users');
const users = await response.json();

/*
Object schema
1. Extract the specified properties of each object in the array (id and login)
2. Return objects with id less than 5 - [lt:5]
3. For each object, rename 'login' as 'secureId' - [as:"secureId"]
*/
const useCase4 = new Syntaxe();
useCase4.data(users);
const useCase4Result1 = await useCase4.query({
    schema: `{
        id[lt:5]
        login[as:"secureId"]
    }`
});
console.log(useCase4Result1);

/*
Object schema
1. Extract the specified property of each object in the array (id)
2. For each object, rename 'id' as 'sn' and only return objects where sn is greater than 5 - [as:"sn"][gt:5]
3. Return the first 10 entries
*/
useCase4.schema(`{
    id[as:"sn"][gt:5]
}[first:10]`);
console.log(await useCase4.query());
/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Output:
[
  { id: 1, secureId: 'mojombo' },
  { id: 2, secureId: 'defunkt' },
  { id: 3, secureId: 'pjhyett' },
  { id: 4, secureId: 'wycats' }
]
[
  { sn: 6 },  { sn: 7 },
  { sn: 17 }, { sn: 18 },
  { sn: 19 }, { sn: 20 },
  { sn: 21 }, { sn: 22 },
  { sn: 23 }, { sn: 25 }
]
*/
```
