Syntaxe

[![MIT licensed](https://img.shields.io/badge/license-MIT-0091F7)](./LICENSE)
![NPM Version](https://img.shields.io/badge/npm-v1.1.1-D50100)
![Top Language](https://img.shields.io/badge/javascript-100%25-F0DC4E)

<br/>

# Introduction

_Syntaxe is a data query library inspired by mongodb and graphql._

Syntaxe, with the help of a schema and a variety of operators, can be used to perform any number of query operations on most types of data e.g. String, Object or Array.


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

_If the data were yourself, the schema would likely resemble your reflection._

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
<td align="left">This method is used to define the schema for querying the data.</td>
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
<td align="left">This is an asynchronous method that uses the defined schema to query the set data.</td>
<td align="left">

```js
const useCase1 = new Syntaxe();
useCase1.data([1,2,3,4,5]);
useCase1.schema(`[btw:[2,4]]`);
const result = await useCase1.query();
```
  
</td>
<td align="left">

  Value: `Object`, `Array`, `String`, `Number`, `Boolean` or `undefined`

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
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Output:
[
  { id: 1, secureId: 'mojombo' },
  { id: 2, secureId: 'defunkt' },
  { id: 3, secureId: 'pjhyett' },
  { id: 4, secureId: 'wycats' }
]
*/

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
  { sn: 6 },  { sn: 7 },
  { sn: 17 }, { sn: 18 },
  { sn: 19 }, { sn: 20 },
  { sn: 21 }, { sn: 22 },
  { sn: 23 }, { sn: 25 }
]
*/
```
### Use case 5 (Invoke both data and schema methods by chaining them to perform a query)

```js
import Syntaxe from "syntaxe";

const response = await fetch('https://api.github.com/users');
const users = await response.json();

/*
Object schema
1. Extract the specified properties of each object in the array (id, login and type)
2. Return objects with any type that is not equal to "user" - [nei:"user"] (case-insensitive)
*/
const useCase5 = new Syntaxe();
const useCase5Result = await useCase5
                              .data(users)
                              .schema(`{
                                id
                                login
                                type[nei:"user"]
                              }`)                              
                              .query();
console.log(useCase5Result);
/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Output:
[ { id: 44, login: 'errfree', type: 'Organization' } ]
*/
```
### Use case 6 (Using the .then() Promise method)

```js
import Syntaxe from "syntaxe";

const response = await fetch('https://api.github.com/users');
const users = await response.json();

/*
Object schema
1. Extract the specified property of each object in the array (type)
2. Process objects where type is equal to "user" - [eqi:"user"] (case-insensitive)
3. Return the size of the result
*/
const useCase6 = new Syntaxe();
const useCase6Result = useCase6
                        .data(users)
                        .schema(`{
                            type[eqi:"user"]
                        }[size]`)
                        .query();

useCase6Result.then(console.log);
/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Output:
29
*/
```

# Operators

## What are those❓

Operators are an essential part of performing queries with syntaxe, they can be used in conjunction with a schema to filter or mutate the data.

Operators are always enclosed in square brackets `[]`, and can be surgical (mutate data) or logical (filter based on conditions).

## Surgical Operators 💉

Surgical operators cause the data to mutate and return the mutated result.

When used in conjuction with logical operator(s), the result of the mutation is piped into the succeeding logical operator(s). 

<table>
<tr>
<td align="left">Operator</td>
<td align="left">Description</td>
<td align="left">Usage</td>
</tr>

<!-- 1 -->
<tr>
<td align="left">
  
`[as]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 2 -->
<tr>
<td align="left">
  
`[news]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 3 -->
<tr>
<td align="left">
  
`[size]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 4 -->
<tr>
<td align="left">
  
`[first]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 5 -->
<tr>
<td align="left">
  
`[last]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 6 -->
<tr>
<td align="left">
  
`[btw]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 7 -->
<tr>
<td align="left">
  
`[dist]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

</table>

## Logical Operators 🧠

Logical operators do not cause the data to mutate, and they only return the data if the condition(s) created by the operator(s) is/are met.

_The data queried by logical operators can be the original value data, or the mutated result of surgical operators._

<table>
<tr>
<td align="left">Operator</td>
<td align="left">Description</td>
<td align="left">Usage</td>
</tr>

<!-- 1 -->
<tr>
<td align="left">
  
`[mode]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 2 -->
<tr>
<td align="left">
  
`[eq]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 3 -->
<tr>
<td align="left">
  
`[eqi]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 4 -->
<tr>
<td align="left">
  
`[ne]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 5 -->
<tr>
<td align="left">
  
`[nei]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 6 -->
<tr>
<td align="left">
  
`[gt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 7 -->
<tr>
<td align="left">
  
`[gte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 8 -->
<tr>
<td align="left">
  
`[lt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 9 -->
<tr>
<td align="left">
  
`[lte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 10 -->
<tr>
<td align="left">
  
`[nn]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 11 -->
<tr>
<td align="left">
  
`[gte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 12 -->
<tr>
<td align="left">
  
`[in]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 13 -->
<tr>
<td align="left">
  
`[nin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 14 -->
<tr>
<td align="left">
  
`[ini]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 15 -->
<tr>
<td align="left">
  
`[nini]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 16 -->
<tr>
<td align="left">
  
`[regex]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 17 -->
<tr>
<td align="left">
  
`[regexne]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 18 -->
<tr>
<td align="left">
  
`[regexin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 19 -->
<tr>
<td align="left">
  
`[regexnin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 20 -->
<tr>
<td align="left">
  
`[seq]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 21 -->
<tr>
<td align="left">
  
`[sne]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 22 -->
<tr>
<td align="left">
  
`[sgt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 23 -->
<tr>
<td align="left">
  
`[slt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 24 -->
<tr>
<td align="left">
  
`[sgte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 25 -->
<tr>
<td align="left">
  
`[slte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 26 -->
<tr>
<td align="left">
  
`[sin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 27 -->
<tr>
<td align="left">
  
`[snin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 28 -->
<tr>
<td align="left">
  
`[dteq]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 29 -->
<tr>
<td align="left">
  
`[dtne]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 30 -->
<tr>
<td align="left">
  
`[dtgt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 31 -->
<tr>
<td align="left">
  
`[dtlt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 32 -->
<tr>
<td align="left">
  
`[dtgte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 33 -->
<tr>
<td align="left">
  
`[dtlte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 34 -->
<tr>
<td align="left">
  
`[dtin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 35 -->
<tr>
<td align="left">
  
`[dtnin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 36 -->
<tr>
<td align="left">
  
`[dtmeq]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 37 -->
<tr>
<td align="left">
  
`[dtmne]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 38 -->
<tr>
<td align="left">
  
`[dtmgt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 39 -->
<tr>
<td align="left">
  
`[dtmlt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 40 -->
<tr>
<td align="left">
  
`[dtmgte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 41 -->
<tr>
<td align="left">
  
`[dtmlte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 42 -->
<tr>
<td align="left">
  
`[dtmin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 43 -->
<tr>
<td align="left">
  
`[dtmnin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 44 -->
<tr>
<td align="left">
  
`[yeq]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 45 -->
<tr>
<td align="left">
  
`[yne]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 46 -->
<tr>
<td align="left">
  
`[ygt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 47 -->
<tr>
<td align="left">
  
`[ylt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 48 -->
<tr>
<td align="left">
  
`[ygte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 49 -->
<tr>
<td align="left">
  
`[ylte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 50 -->
<tr>
<td align="left">
  
`[yin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 51 -->
<tr>
<td align="left">
  
`[ynin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 52 -->
<tr>
<td align="left">
  
`[meq]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 53 -->
<tr>
<td align="left">
  
`[mne]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 54 -->
<tr>
<td align="left">
  
`[mgt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 55 -->
<tr>
<td align="left">
  
`[mlt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 56 -->
<tr>
<td align="left">
  
`[mgte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 57 -->
<tr>
<td align="left">
  
`[mlte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 58 -->
<tr>
<td align="left">
  
`[min]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 59 -->
<tr>
<td align="left">
  
`[mnin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 60 -->
<tr>
<td align="left">
  
`[today]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 61 -->
<tr>
<td align="left">
  
`[deq]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 62 -->
<tr>
<td align="left">
  
`[dne]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 63 -->
<tr>
<td align="left">
  
`[dgt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 64 -->
<tr>
<td align="left">
  
`[dlt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 65 -->
<tr>
<td align="left">
  
`[dgte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 66 -->
<tr>
<td align="left">
  
`[dlte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 67 -->
<tr>
<td align="left">
  
`[din]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 68 -->
<tr>
<td align="left">
  
`[dnin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 69 -->
<tr>
<td align="left">
  
`[heq]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 70 -->
<tr>
<td align="left">
  
`[hne]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 71 -->
<tr>
<td align="left">
  
`[hgt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 72 -->
<tr>
<td align="left">
  
`[hlt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 73 -->
<tr>
<td align="left">
  
`[hgte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 74 -->
<tr>
<td align="left">
  
`[hlte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 75 -->
<tr>
<td align="left">
  
`[hin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 76 -->
<tr>
<td align="left">
  
`[hnin]`  

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 77 -->
<tr>
<td align="left">
  
`[hinrange]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 78 -->
<tr>
<td align="left">
  
`[hninrange]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 79 -->
<tr>
<td align="left">
  
`[mineq]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 80 -->
<tr>
<td align="left">
  
`[minne]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 81 -->
<tr>
<td align="left">
  
`[mingt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 82 -->
<tr>
<td align="left">
  
`[minlt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 83 -->
<tr>
<td align="left">
  
`[mingte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 84 -->
<tr>
<td align="left">
  
`[minlte]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 85 -->
<tr>
<td align="left">
  
`[minin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 86 -->
<tr>
<td align="left">
  
`[minnin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 87 -->
<tr>
<td align="left">
  
`[mininrange]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 88 -->
<tr>
<td align="left">
  
`[minninrange]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 89 -->
<tr>
<td align="left">
  
`[teq]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 90 -->
<tr>
<td align="left">
  
`[tne]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 91 -->
<tr>
<td align="left">
  
`[tgt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 92 -->
<tr>
<td align="left">
  
`[tlt]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 93 -->
<tr>
<td align="left">
  
`[tin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 94 -->
<tr>
<td align="left">
  
`[tnin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 95 -->
<tr>
<td align="left">
  
`[tinrange]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 96 -->
<tr>
<td align="left">
  
`[tninrange]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 97 -->
<tr>
<td align="left">
  
`[ago]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

<!-- 98 -->
<tr>
<td align="left">
  
`[agoin]`

</td>
<td align="left">Changes a property's name to another.</td>
<td align="left">

```js
new Syntaxe({
  schema: `{
    login [as:"username"]
  }`
});
```
  
</td>
</tr>

</table>
