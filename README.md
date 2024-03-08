# Syntaxe

[![MIT licensed](https://img.shields.io/badge/license-MIT-0091F7)](./LICENSE)
![NPM Version](https://img.shields.io/badge/npm-v1.1.1-D50100)
![Top Language](https://img.shields.io/badge/javascript-100%25-F0DC4E)

_Syntaxe is a data query library inspired by graphql._

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

// Promise
sx.query().then((result) => {});
// Result: 3

// OR

// Await
const result = await sx.query();
// Result: 3

```

# Usage

## Schema ✍🏽️

### Whatsa Skee-ma-ah?

_If your data were you, the schema would bear some resemblance to your reflection._

In syntaxe, the schema determines how your data is queried. It represents the structure of the value to be returned or the computed result of the data.

A schema can be object-like if the data contains object(s), such as `[{..},{..}]` or `{..}`, or it can be in-line for any type of data. Additionally, it may incorporate one or more operators (just key or key-value pair), such as `[first]`, `[gt:2]`, `[ago:"5minutes"]` and so on, which assist in tailoring the result to your requirements.

To compose a proper schema, it is essential to always enclose it within backtick symbols (`) to denote its scope.

### Object schema example

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

/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Result:
[
  { id: 1, username: 'mojombo', type: 'User', site_admin: false },
  { id: 2, username: 'defunkt', type: 'User', site_admin: false }
]
*/
```

### In-line schema example

```js
import Syntaxe from "syntaxe";

const response = await fetch('https://api.github.com/users');
const users = await response.json();

const sx = new Syntaxe({
  data: users
});

/*
In-line
1. Extract the entries from index 2 to index 8
2. Return the size of the extracted data, if it is greater than 4
*/

const inSchemaResult = await sx.query({
    schema: `[btw:[2,8]][size][gt:4]`
});

/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Result: 6
*/
```

## Methods 🏒

### Instance methods

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
<td align="left">This method is used to define the data to be queried</td>
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
<td align="left">This method is used to define the schema for querying the data</td>
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
<td align="left">This is an asynchronous method that uses the defined schema to query the set data</td>
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

console.log(result);
// Result: 'orange'
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

/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Result:
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
await useCase2.query();

/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Result: 30
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
2. For each object, rename 'login' to 'userId' - [as:"userId"]
3. Return the last entry - [last]
*/

const useCase3 = new Syntaxe();
const useCase3Result = await useCase3.query({
    data: users,
    schema: `{
        login[as:"userId"]
    }[last]`
});

/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Result:
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
3. For each object, rename 'login' to 'secureId' - [as:"secureId"]
*/

const useCase4 = new Syntaxe();
useCase4.data(users);
const useCase4Result1 = await useCase4.query({
    schema: `{
        id[lt:5]
        login[as:"secureId"]
    }`
});

/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Result:
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
2. For each object, rename 'id' to 'sn' and only return objects where sn is greater than 5 - [as:"sn"][gt:5]
3. Return the first 10 entries
*/

useCase4.schema(`{
    id[as:"sn"][gt:5]
}[first:10]`);
await useCase4.query();

/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Result:
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

/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Result:
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

useCase6Result.then((result) => {});

/*
Result is based on the state of the data returned by 'https://api.github.com/users' as of February 12, 2024.

Result:
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

> [!IMPORTANT]
> Surgical operators, however and wherever they are used, DETERMINE WHAT VALUE IS RETURNED.


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
<td align="left">
  As
  <br/>
  <br/>
  Substitues a property name for another (the new property name returned will be the value assigned to the 'as' operator)
</td>
<td align="left">

```js
new Syntaxe({
  data: [{ id: 1, login: "john" }],
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
<td align="left">
  No Extra White Space
  <br/>
  <br/>
  Removes any extra whitespace in a string value or replaces it with any value provided
</td>
<td align="left">

```js
// removes extra whitespace
const schemaOne = `{
  title [news]
}`;

// replaces extra whitespace
const schemaTwo = `{
  title [news:"*"]
}`;

new Syntaxe({
  data: [{
    id: 1,
    title: "Harry Potter and the Philosopher   's Stone"
  }],
  schema: schemaOne // or schemaTwo
});
```
  
</td>
</tr>

<!-- 3 -->
<tr>
<td align="left">
  
`[nws]`

</td>
<td align="left">
  No White Space
  <br/>
  <br/>
  Removes any whitespace in a string or replaces it with any value provided
</td>
<td align="left">

```js
// removes any whitespace
const schemaOne = `{
  title [nws]
}`;

// replaces any whitespace
const schemaTwo = `{
  title [nws:"*"]
}`;

new Syntaxe({
  data: [{ id: 1, title: "Tha no s" }],
  schema: schemaOne // or schemaTwo
});
```
  
</td>
</tr>

<!-- 4 -->
<tr>
<td align="left">
  
`[size]`

</td>
<td align="left">
  Size
  <br/>
  <br/>
  Computes and returns the size of a value as the new value (applies to Array, String and Object)
</td>
<td align="left">

```js
new Syntaxe({
  data: [{
    id: 1,
    currencies: ["ngn", "usd", "gbp", "eur", "inr"]
  }],
  schema: `{
    currencies [as:"curr"][size]
  }`
});
```
  
</td>
</tr>

<!-- 5 -->
<tr>
<td align="left">
  
`[first]`

</td>
<td align="left">
  First
  <br/>
  <br/>
  Returns the first entry or specified number of entries (if specified) of an Array from the top
</td>
<td align="left">

```js
// first entry
const schemaOne = `{
  currencies [first]
}`;

// first 3 entries
const schemaTwo = `{
  currencies [first:3]
}`;

new Syntaxe({
  data: [{
    id: 1,
    currencies: ["ngn", "usd", "gbp", "eur", "inr"]
  }],
  schema: schemaOne // or schemaTwo
});
```
  
</td>
</tr>

<!-- 6 -->
<tr>
<td align="left">
  
`[last]`

</td>
<td align="left">
  Last
  <br/>
  <br/>
  Returns the last entry or specified number of entries (if specified) of an Array from the top
</td>
<td align="left">

```js
// last entry
const schemaOne = `{
  currencies [last]
}`;

// last 3 entries
const schemaTwo = `{
  currencies [last:3]
}`;

new Syntaxe({
  data: [{
    id: 1,
    currencies: ["ngn", "usd", "gbp", "eur", "inr"]
  }],
  schema: schemaOne // or schemaTwo
});
```
  
</td>
</tr>

<!-- 7 -->
<tr>
<td align="left">
  
`[btw]`

</td>
<td align="left">
  Between
  <br/>
  <br/>
  Returns the entries of an Array specified by a [minimum-index, maximum-index] range.
  NOTE: If just one index is provided as such [index], the minimum index defaults to 0
</td>
<td align="left">

```js
// from entry 1 to 2 (same as [first:2])
const schemaOne = `{
  currencies [btw:2]
}`;

// from entry 3 to 5
const schemaTwo = `{
  currencies [btw:[2,5]]
}`;

new Syntaxe({
  data: [{
    id: 1,
    currencies: ["ngn", "usd", "gbp", "eur", "inr"]
  }],
  schema: schemaOne // or schemaTwo
});
```
  
</td>
</tr>

<!-- 8 -->
<tr>
<td align="left">
  
`[dist]`

</td>
<td align="left">
  Distinct
  <br/>
  <br/>
  Returns a list of distinct values (applies to Array).
  NOTE: If a value is assigned to the 'dist' operator, it is used to filter existing objects in the array</td>
<td align="left">

```js
// distinct values
const schemaOne = `{
  currencies [dist]
}`;

/*
  distinct values
  (objects distinguished by their code property)
*/
const schemaTwo = `{
  currencies [dist:"code"]
}`;

new Syntaxe({
  data: [{
    id: 1,
    currencies: [
      "ngn",
      "usd",
      { name: "Pound Sterling", code: "gbp" },
      { name: "Euro", code: "eur" },
      { name: "Pound Sterling", code: "gbp" },
      "inr"
    ]
  }],
  schema: schemaOne // or schemaTwo
});
```
  
</td>
</tr>

</table>

## Logical Operators 🧠

Logical operators do not cause the data to mutate, and they only return the data if the condition(s) created by the operator(s) is/are met.

_The data queried by logical operators can be the original value data, or the mutated result of surgical operators._

> [!IMPORTANT]
> Logical operators, however and wherever they are used, DETERMINE IF THE VALUE IS RETURNED.
>
> The `mode` and `cond` logical operators can be set to `or` or `and`, which determines the behavior of the query (how the query is processed).
>
> An `and` will require all logical expressions to evaluate to true for the value to be returned.
>
> An `or` will require at least one logical expression to evaluate to true for the value to be returned.
>
> 
> NOTE: When dealing with an array of objects, the `mode` operator can be applied to the object schema itself, or to any of the properties within the object.


<table>
<tr>
<td align="left">Operator</td>
<td align="left">Description</td>
<td align="left">Usage</td>
</tr>

<!-- 0 -->
<tr>
<td align="left">
  
`[cond]`

</td>
<td align="left">
  
  CONDITION (`and`, `or`)
  
  <br/>
  <br/>
  
  Determines how a chain of operations associated with a property is evaluated.
  <br/>
  Default: `and`

  <br/>

  NOTE: Check below for more understanding of this operator.
  
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate
    [yeq:2024][meq:"October"][cond:"or"]
  }`
});
// [ { statusDate: '6/10/2024' } ]
```
  
</td>
</tr>

<!-- 1 -->
<tr>
<td align="left">
  
`[mode]`

</td>
<td align="left">
  
  MODE (`and`, `or`)
  
  <br/>
  <br/>
  
  Determines how properties in an object with associated operations are evaluated.
  <br/>
  Default: `and`

  <br/>

  NOTE: Check below for more understanding of this operator.
  
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    id[eq:1]
    statusDate
    [yeq:2024][meq:"October"][cond:"or"]
  } [mode:"or"]`
});
/*
[
  { id: 1, statusDate: '2/8/2023' },
  { id: 2, statusDate: '6/10/2024' }
]
*/
```
  
</td>
</tr>

<!-- 2 -->
<tr>
<td align="left">
  
`[eq]`

</td>
<td align="left">
  Equal
  <br/>
  <br/>
  Checks if data value equates to a provided value.
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    id[eq:1]
    currencies[first]
  }`
});
// [ { id: 1, currencies: 'ngn' } ]
```
  
</td>
</tr>

<!-- 3 -->
<tr>
<td align="left">
  
`[eqi]`

</td>
<td align="left">
  Equal (case-insensitive)
  <br/>
  <br/>
  Checks if data value equates to a provided value (case-insensitive)
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[first][eqi:"NGN"]
  }`
});
// [ { currencies: 'ngn' } ]
```
  
</td>
</tr>

<!-- 4 -->
<tr>
<td align="left">
  
`[ne]`

</td>
<td align="left">
  Not Equal
  <br/>
  <br/>
  Checks if data value does not equate to a provided value
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[last][ne:"gbp"]
  }`
});
/*
[
  { currencies: 'inr' },
  { currencies: 'usd' }
]
*/
```
  
</td>
</tr>

<!-- 5 -->
<tr>
<td align="left">
  
`[nei]`

</td>
<td align="left">
  Not Equal (case-insensitive)
  <br/>
  <br/>
  Checks if data value does not equate to a provided value (case-insensitive)
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[last][nei:"INR"]
  }`
});
// [ { currencies: 'usd' } ]
```
  
</td>
</tr>

<!-- 6 -->
<tr>
<td align="left">
  
`[gt]`

</td>
<td align="left">
  Greater Than
  <br/>
  <br/>
  Checks if data value is greater than a provided value
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    id[gt:1]
    currencies[first:2]
  }`
});
// [ { id: 2, currencies: 'usd' } ]
```
  
</td>
</tr>

<!-- 7 -->
<tr>
<td align="left">
  
`[gte]`

</td>
<td align="left">
  Greater Than or Equal
  <br/>
  <br/>
  Checks if data value is greater than or equal to a provided value
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    id[gte:1]
    currencies[first:2]
  }`
});
/*
[
  {
    id: 1,
    currencies: [ 'ngn', 'usd' ]
  },
  { id: 2, currencies: 'usd' }
]
*/
```
  
</td>
</tr>

<!-- 8 -->
<tr>
<td align="left">
  
`[lt]`

</td>
<td align="left">
  Less Than
  <br/>
  <br/>
  Checks if data value is lesser than a provided value
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    id[lt:2]
    currencies[first]
  }`
});
// [ { id: 1, currencies: 'ngn' } ]
```
  
</td>
</tr>

<!-- 9 -->
<tr>
<td align="left">
  
`[lte]`

</td>
<td align="left">
  Less Than or Equal
  <br/>
  <br/>
  Checks if data value is lesser than or equal to a provided value
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    id[lte:1]
    currencies[last]
  }`
});
// [ { id: 1, currencies: 'inr' } ]
```
  
</td>
</tr>

<!-- 10 -->
<tr>
<td align="left">
  
`[nn]`

</td>
<td align="left">
  Not Null
  <br/>
  <br/>
  Checks if data value is not null
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: null }
  ],
  schema: `{
    id[lte:2]
    currencies[nn][last]
  }`
});
// [ { id: 1, currencies: 'inr' } ]
```
  
</td>
</tr>

<!-- 12 -->
<tr>
<td align="left">
  
`[in]`

</td>
<td align="left">
  In
  <br/>
  <br/>
  Checks if data intersects or contains any of the provided values (applies to Array)
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[in:["gbp", "usd"]]
  }`
});
/*
[
  {
    currencies: [
      'ngn', 'usd', 'gbp',
      'eur', 'inr'
    ]
  },
  { currencies: 'usd' }
]
*/
```
  
</td>
</tr>

<!-- 13 -->
<tr>
<td align="left">
  
`[nin]`

</td>
<td align="left">
  Not In
  <br/>
  <br/>
  Checks if data doesn't intersect and doesn't contain any of the provided values (applies to Array)
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[nin:["gbp"]]
  }`
});
// [ { currencies: 'usd' } ]
```
  
</td>
</tr>

<!-- 14 -->
<tr>
<td align="left">
  
`[ini]`

</td>
<td align="left">
  In (case-insensitive)
  <br/>
  <br/>
  Checks if data contains case-insensitive value (applies to Array)
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[ini:["EUR"]]
  }`
});
/*
[
  {
    currencies: [
      'ngn', 'usd', 'gbp',
      'eur', 'inr'
    ]
  }
]
*/
```
  
</td>
</tr>

<!-- 15 -->
<tr>
<td align="left">
  
`[nini]`

</td>
<td align="left">
  Not In (case-insensitive)
  <br/>
  <br/>
  Checks if data does not contain case-insensitive value (applies to Array)
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[nini:["GBP"]]
  }`
});
// [ { currencies: 'usd' } ]
```
  
</td>
</tr>

<!-- 16 -->
<tr>
<td align="left">
  
`[regex]`

</td>
<td align="left">
  Regular Expression (Match)
  <br/>
  <br/>
  Checks if a data value matches provided regular expression
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[regex:/eu/]
  }`
});
/*
[
  {
    currencies: [
      'ngn', 'usd', 'gbp',
      'eur', 'inr'
    ]
  }
]
*/
```
  
</td>
</tr>

<!-- 17 -->
<tr>
<td align="left">
  
`[regexne]`

</td>
<td align="left">
  Regular Expression (Doesn't match)
  <br/>
  <br/>
  Checks if a data value does not match provided regular expression
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[regexne:/eu/]
  }`
});
// [ { currencies: 'usd' } ]
```
  
</td>
</tr>

<!-- 18 -->
<tr>
<td align="left">
  
`[regexin]`

</td>
<td align="left">
  Regular Expression (In)
  <br/>
  <br/>
  Checks if a data value matches any entry in an array of regular expressions
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[regexin:[ /eu/, /gbp/ ]]
  }`
});
/*
[
  {
    currencies: [
      'ngn', 'usd', 'gbp',
      'eur', 'inr'
    ]
  }
]
*/
```
  
</td>
</tr>

<!-- 19 -->
<tr>
<td align="left">
  
`[regexnin]`

</td>
<td align="left">
  Regular Expression (Not In)
  <br/>
  <br/>
  Checks if a data value matches none of the entries in an array of regular expressions
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[regexnin:[ /eu/, /gbp/ ]]
  }`
});
// [ { currencies: 'usd' } ]
```
  
</td>
</tr>

<!-- 20 -->
<tr>
<td align="left">
  
`[seq]`

</td>
<td align="left">
  Size Equal
  <br/>
  <br/>
  Checks if the size of data value is equal to provided value
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[seq:3]
  }`
});
// [ { currencies: 'usd' } ]
```
  
</td>
</tr>

<!-- 21 -->
<tr>
<td align="left">
  
`[sne]`

</td>
<td align="left">
  Size Not Equal
  <br/>
  <br/>
  Checks if the size of data value is not equal to provided value
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[sne:3]
  }`
});
/*
[
  {
    currencies: [
      'ngn', 'usd', 'gbp',
      'eur', 'inr'
    ]
  }
]
*/
```
  
</td>
</tr>

<!-- 22 -->
<tr>
<td align="left">
  
`[sgt]`

</td>
<td align="left">
  Size Greater Than
  <br/>
  <br/>
  Checks if the size of data value is greater than provided value
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[sgt:3]
  }`
});
/*
[
  {
    currencies: [
      'ngn', 'usd', 'gbp',
      'eur', 'inr'
    ]
  }
]
*/
```
  
</td>
</tr>

<!-- 23 -->
<tr>
<td align="left">
  
`[slt]`

</td>
<td align="left">
  Size Less Than
  <br/>
  <br/>
  Checks if the size of data value is less than provided value
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[sgt:3]
  }`
});
// []
```
  
</td>
</tr>

<!-- 24 -->
<tr>
<td align="left">
  
`[sgte]`

</td>
<td align="left">
  Size Greater Than or Equal
  <br/>
  <br/>
  Checks if the size of data value is greater than or equals provided value
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[sgte:3]
  }`
});
/*
[
  {
    currencies: [
      'ngn', 'usd', 'gbp',
      'eur', 'inr'
    ]
  },
  { currencies: 'usd' }
]
*/
```
  
</td>
</tr>

<!-- 25 -->
<tr>
<td align="left">
  
`[slte]`

</td>
<td align="left">
  Size Less Than or Equal
  <br/>
  <br/>
  Checks if the size of data value is less than or equals provided value
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[slte:3]
  }`
});
// [ { currencies: 'usd' } ]
```
  
</td>
</tr>

<!-- 26 -->
<tr>
<td align="left">
  
`[sin]`

</td>
<td align="left">
  Size In
  <br/>
  <br/>
  Checks if the size of data value is provided range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[sin:[4,5,6]]
  }`
});
/*
[
  {
    currencies: [
      'ngn', 'usd', 'gbp',
      'eur', 'inr'
    ]
  }
]
*/
```
  
</td>
</tr>

<!-- 27 -->
<tr>
<td align="left">
  
`[snin]`

</td>
<td align="left">
  Size Not In
  <br/>
  <br/>
  Checks if the size of data value is not provided range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      currencies: [
        "ngn", "usd", "gbp",
        "eur", "inr"
      ]
    },
    { id: 2, currencies: "usd" }
  ],
  schema: `{
    currencies[snin:[4,5,6]]
  }`
});
// [ { currencies: 'usd' } ]
```
  
</td>
</tr>

<!-- 28 -->
<tr>
<td align="left">
  
`[dteq]`

</td>
<td align="left">
  Date Equal
  <br/>
  <br/>
  Checks if date value is equal to provided date
</td>
<td align="left">

```js
const dateValue = new Date(2024,2,6);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024'
    }
  ],
  schema: `{
    statusDate[dteq:"${dateValue}"]
  }`
});
// [ { statusDate: '3/6/2024' } ]
```
  
</td>
</tr>

<!-- 29 -->
<tr>
<td align="left">
  
`[dtne]`

</td>
<td align="left">
  Date Not Equal
  <br/>
  <br/>
  Checks if date value is not equal to provided date
</td>
<td align="left">

```js
const dateValue = new Date(2024,2,6);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024'
    }
  ],
  schema: `{
    statusDate[dtne:"${dateValue}"]
  }`
});
// [ { statusDate: '3/8/2024' } ]
```
  
</td>
</tr>

<!-- 30 -->
<tr>
<td align="left">
  
`[dtgt]`

</td>
<td align="left">
  Date Greater Than
  <br/>
  <br/>
  Checks if date value is greater than provided date
</td>
<td align="left">

```js
const dateValue = new Date(2024,2,6);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024'
    }
  ],
  schema: `{
    statusDate[dtgt:"${dateValue}"]
  }`
});
// [ { statusDate: '3/8/2024' } ]
```
  
</td>
</tr>

<!-- 31 -->
<tr>
<td align="left">
  
`[dtlt]`

</td>
<td align="left">
  Date Less Than
  <br/>
  <br/>
  Checks if date value is less than provided date
</td>
<td align="left">

```js
const dateValue = new Date(2024,2,6);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024'
    }
  ],
  schema: `{
    statusDate[dtlt:"${dateValue}"]
  }`
});
// []
```
  
</td>
</tr>

<!-- 32 -->
<tr>
<td align="left">
  
`[dtgte]`

</td>
<td align="left">
  Date Greater Than or Equal
  <br/>
  <br/>
  Checks if date value is greater than or equal to provided date
</td>
<td align="left">

```js
const dateValue = new Date(2024,2,6);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024'
    }
  ],
  schema: `{
    statusDate[dtgte:"${dateValue}"]
  }`
});
/*
[
  { statusDate: '3/6/2024' },
  { statusDate: '3/8/2024' }
]
*/
```
  
</td>
</tr>

<!-- 33 -->
<tr>
<td align="left">
  
`[dtlte]`

</td>
<td align="left">
  Date Less Than or Equal
  <br/>
  <br/>
  Checks if date value is less than or equal to provided date
</td>
<td align="left">

```js
const dateValue = new Date(2024,2,6);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024'
    }
  ],
  schema: `{
    statusDate[dtlte:"${dateValue}"]
  }`
});
// [ { statusDate: '3/6/2024' } ]
```
  
</td>
</tr>

<!-- 34 -->
<tr>
<td align="left">
  
`[dtin]`

</td>
<td align="left">
  Date In
  <br/>
  <br/>
  Checks if date value is in provided date range
</td>
<td align="left">

```js
const dateValue1 = new Date(2024,2,4);
const dateValue2 = new Date(2024,2,7);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024'
    }
  ],
  schema: `{
    statusDate
    [dtin:["${dateValue1}",
        "${dateValue2}"]]
  }`
});
// [ { statusDate: '3/6/2024' } ]
```
  
</td>
</tr>

<!-- 35 -->
<tr>
<td align="left">
  
`[dtnin]`

</td>
<td align="left">
  Date Not In
  <br/>
  <br/>
  Checks if date value is not in provided date range
</td>
<td align="left">

```js
const dateValue1 = new Date(2024,2,4);
const dateValue2 = new Date(2024,2,7);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024'
    }
  ],
  schema: `{
    statusDate
    [dtnin:["${dateValue1}",
        "${dateValue2}"]]
  }`
});
// [ { statusDate: '3/8/2024' } ]
```
  
</td>
</tr>

<!-- 36 -->
<tr>
<td align="left">
  
`[dtmeq]`

</td>
<td align="left">
  Date/Time Equal
  <br/>
  <br/>
  Checks if datetime value is equal to provided datetime
</td>
<td align="left">

```js
const dtmValue = new Date(2024,2,8,10,0,0);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024 10:00:00'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024 10:00:00'
    }
  ],
  schema: `{
    statusDate
    [dtmeq:"${dtmValue}"]
  }`
});
// [ { statusDate: '3/8/2024 10:00:00' } ]
```
  
</td>
</tr>

<!-- 37 -->
<tr>
<td align="left">
  
`[dtmne]`

</td>
<td align="left">
  Date/Time Not Equal
  <br/>
  <br/>
  Checks if datetime value is not equal to provided datetime
</td>
<td align="left">

```js
const dtmValue = new Date(2024,2,8,10,0,0);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024 10:00:00'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024 10:00:00'
    }
  ],
  schema: `{
    statusDate
    [dtmne:"${dtmValue}"]
  }`
});
// [ { statusDate: '3/6/2024 10:00:00' } ]
```
  
</td>
</tr>

<!-- 38 -->
<tr>
<td align="left">
  
`[dtmgt]`

</td>
<td align="left">
  Date/Time Greater Than
  <br/>
  <br/>
  Checks if datetime value is greater than provided datetime
</td>
<td align="left">

```js
const dtmValue = new Date(2024,2,6,10,30,50);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024 10:00:00'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024 10:00:00'
    }
  ],
  schema: `{
    statusDate
    [dtmgt:"${dtmValue}"]
  }`
});
// [ { statusDate: '3/8/2024 10:00:00' } ]
```
  
</td>
</tr>

<!-- 39 -->
<tr>
<td align="left">
  
`[dtmlt]`

</td>
<td align="left">
  Date/Time Less Than
  <br/>
  <br/>
  Checks if datetime value is less than provided datetime
</td>
<td align="left">

```js
const dtmValue = new Date(2024,2,6,10,30,50);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024 10:00:00'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024 10:00:00'
    }
  ],
  schema: `{
    statusDate
    [dtmlt:"${dtmValue}"]
  }`
});
// [ { statusDate: '3/6/2024 10:00:00' } ]
```
  
</td>
</tr>

<!-- 40 -->
<tr>
<td align="left">
  
`[dtmgte]`

</td>
<td align="left">
  Date/Time Greater Than or Equal
  <br/>
  <br/>
  Checks if datetime value is greater than or equal to provided datetime
</td>
<td align="left">

```js
const dtmValue = new Date(2024,2,6,10,30,50);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024 10:00:00'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024 10:00:00'
    }
  ],
  schema: `{
    statusDate
    [dtmgte:"${dtmValue}"]
  }`
});
// [ { statusDate: '3/8/2024 10:00:00' } ]
```
  
</td>
</tr>

<!-- 41 -->
<tr>
<td align="left">
  
`[dtmlte]`

</td>
<td align="left">
  Date/Time Less Than or Equal
  <br/>
  <br/>
  Checks if datetime value is less than or equal to provided datetime
</td>
<td align="left">

```js
const dtmValue = new Date(2024,2,6,10,30,50);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024 10:00:00'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024 10:00:00'
    }
  ],
  schema: `{
    statusDate
    [dtmlte:"${dtmValue}"]
  }`
});
// [ { statusDate: '3/6/2024 10:00:00' } ]
```
  
</td>
</tr>

<!-- 42 -->
<tr>
<td align="left">
  
`[dtmin]`

</td>
<td align="left">
  Date/Time In
  <br/>
  <br/>
  Checks if datetime value is in provided datetime range
</td>
<td align="left">

```js
const dtmValue1 = new Date(2024,2,5,23,59,50);
const dtmValue2 = new Date(2024,2,6,10,0,1);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024 10:00:00'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024 10:00:00'
    }
  ],
  schema: `{
    statusDate
    [dtmin:["${dtmValue1}",
      "${dtmValue2}"]]
  }`
});
// [ { statusDate: '3/6/2024 10:00:00' } ]
```
  
</td>
</tr>

<!-- 43 -->
<tr>
<td align="left">
  
`[dtmnin]`

</td>
<td align="left">
  Date/Time Not In
  <br/>
  <br/>
  Checks if datetime value is not in provided datetime range
</td>
<td align="left">

```js
const dtmValue1 = new Date(2024,2,5,23,59,50);
const dtmValue2 = new Date(2024,2,6,10,0,1);

new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '3/6/2024 10:00:00'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '3/8/2024 10:00:00'
    }
  ],
  schema: `{
    statusDate
    [dtmnin:["${dtmValue1}",
      "${dtmValue2}"]]
  }`
});
// [ { statusDate: '3/8/2024 10:00:00' } ]
```
  
</td>
</tr>

<!-- 44 -->
<tr>
<td align="left">
  
`[yeq]`

</td>
<td align="left">
  Year Equal
  <br/>
  <br/>
  Checks if year value is equal to provided year
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[yeq:2024]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 45 -->
<tr>
<td align="left">
  
`[yne]`

</td>
<td align="left">
  Year Not Equal
  <br/>
  <br/>
  Checks if year value is not equal to provided year
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[yne:2024]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 46 -->
<tr>
<td align="left">
  
`[ygt]`

</td>
<td align="left">
  Year Greater Than
  <br/>
  <br/>
  Checks if year value is greater than provided year
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[ygt:2023]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 47 -->
<tr>
<td align="left">
  
`[ylt]`

</td>
<td align="left">
  Year Less Than
  <br/>
  <br/>
  Checks if year value is less than provided year
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[ylt:2024]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 48 -->
<tr>
<td align="left">
  
`[ygte]`

</td>
<td align="left">
  Year Greater Than or Equal
  <br/>
  <br/>
  Checks if year value is greater than or equal to provided year
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[ygte:2024]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 49 -->
<tr>
<td align="left">
  
`[ylte]`

</td>
<td align="left">
  Year Less Than or Equal
  <br/>
  <br/>
  Checks if year value is less than or equal to provided year
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[ylte:2024]
  }`
});
/*
[
  { statusDate: '2/8/2023 12:40:10' },
  { statusDate: '6/10/2024 05:23:34' }
]
*/
```
  
</td>
</tr>

<!-- 50 -->
<tr>
<td align="left">
  
`[yin]`

</td>
<td align="left">
  Year In
  <br/>
  <br/>
  Checks if year value is in provided year range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[yin:[2024, 2025]]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 51 -->
<tr>
<td align="left">
  
`[ynin]`

</td>
<td align="left">
  Year Not In
  <br/>
  <br/>
  Checks if year value is not in provided year range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[ynin:[2024, 2025]]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 52 -->
<tr>
<td align="left">
  
`[meq]`

</td>
<td align="left">
  Month Equal
  <br/>
  <br/>
  Checks if month value is equal to provided month
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[meq:2]
  }`
});
// [ { statusDate: '2/8/2023' } ]
```
  
</td>
</tr>

<!-- 53 -->
<tr>
<td align="left">
  
`[mne]`

</td>
<td align="left">
  Month Not Equal
  <br/>
  <br/>
  Checks if month value is not equal to provided month
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[mne:2]
  }`
});
// [ { statusDate: '6/10/2024' } ]
```
  
</td>
</tr>

<!-- 54 -->
<tr>
<td align="left">
  
`[mgt]`

</td>
<td align="left">
  Month Greater Than
  <br/>
  <br/>
  Checks if month value is greater than provided month
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[mgt:2]
  }`
});
// [ { statusDate: '6/10/2024' } ]
```
  
</td>
</tr>

<!-- 55 -->
<tr>
<td align="left">
  
`[mlt]`

</td>
<td align="left">
  Month Less Than
  <br/>
  <br/>
  Checks if month value is less than provided month
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[mlt:2]
  }`
});
// []
```
  
</td>
</tr>

<!-- 56 -->
<tr>
<td align="left">
  
`[mgte]`

</td>
<td align="left">
  Month Greater Than or Equal
  <br/>
  <br/>
  Checks if month value is greater than or equal to provided month
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[mgte:2]
  }`
});
/*
[
  { statusDate: '2/8/2023' },
  { statusDate: '6/10/2024' }
]
*/
```
  
</td>
</tr>

<!-- 57 -->
<tr>
<td align="left">
  
`[mlte]`

</td>
<td align="left">
  Month Less Than or Equal
  <br/>
  <br/>
  Checks if month value is less than or equal to provided month
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[mlte:2]
  }`
});
// [ { statusDate: '2/8/2023' } ]
```
  
</td>
</tr>

<!-- 58 -->
<tr>
<td align="left">
  
`[min]`

</td>
<td align="left">
  Month In
  <br/>
  <br/>
  Checks if month value is in provided month range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[min:[1, 4]]
  }`
});
// [ { statusDate: '2/8/2023' } ]
```
  
</td>
</tr>

<!-- 59 -->
<tr>
<td align="left">
  
`[mnin]`

</td>
<td align="left">
  Month Not In
  <br/>
  <br/>
  Checks if month value is not in provided month range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[mnin:[1, 4]]
  }`
});
// [ { statusDate: '6/10/2024' } ]
```
  
</td>
</tr>

<!-- 60 -->
<tr>
<td align="left">
  
`[today]`

</td>
<td align="left">
  Today
  <br/>
  <br/>
  Checks if date value is today
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[today]
  }`
});
// []
```
  
</td>
</tr>

<!-- 61 -->
<tr>
<td align="left">
  
`[deq]`

</td>
<td align="left">
  Day Equal
  <br/>
  <br/>
  Checks if day value is equal to provided day
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[deq:8]
  }`
});
// [ { statusDate: '2/8/2023' } ]
```
  
</td>
</tr>

<!-- 62 -->
<tr>
<td align="left">
  
`[dne]`

</td>
<td align="left">
  Day Not Equal
  <br/>
  <br/>
  Checks if day value is not equal to provided day
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[dne:8]
  }`
});
// [ { statusDate: '6/10/2024' } ]
```
  
</td>
</tr>

<!-- 63 -->
<tr>
<td align="left">
  
`[dgt]`

</td>
<td align="left">
  Day Greater Than
  <br/>
  <br/>
  Checks if day value is greater than provided day
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[dgt:8]
  }`
});
[ { statusDate: '6/10/2024' } ]
```
  
</td>
</tr>

<!-- 64 -->
<tr>
<td align="left">
  
`[dlt]`

</td>
<td align="left">
  Day Less Than
  <br/>
  <br/>
  Checks if day value is less than provided day
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[dlt:8]
  }`
});
// []
```
  
</td>
</tr>

<!-- 65 -->
<tr>
<td align="left">
  
`[dgte]`

</td>
<td align="left">
  Day Greater Than or Equal
  <br/>
  <br/>
  Checks if day value is greater than or equal to provided day
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[dgte:8]
  }`
});
/*
[
  { statusDate: '2/8/2023' },
  { statusDate: '6/10/2024' }
]
*/
```
  
</td>
</tr>

<!-- 66 -->
<tr>
<td align="left">
  
`[dlte]`

</td>
<td align="left">
  Day Less Than or Equal
  <br/>
  <br/>
  Checks if day value is less than or equal to provided day
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[dlte:8]
  }`
});
// [ { statusDate: '2/8/2023' } ]
```
  
</td>
</tr>

<!-- 67 -->
<tr>
<td align="left">
  
`[din]`

</td>
<td align="left">
  Day In
  <br/>
  <br/>
  Checks if day value is in provided day range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[din:[1, 10]]
  }`
});
/*
[
  { statusDate: '2/8/2023' },
  { statusDate: '6/10/2024' }
]
*/
```
  
</td>
</tr>

<!-- 68 -->
<tr>
<td align="left">
  
`[dnin]`

</td>
<td align="left">
  Day Not In
  <br/>
  <br/>
  Checks if day value is not in provided day range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024'
    }
  ],
  schema: `{
    statusDate[din:[1, 10]]
  }`
});
// []
```
  
</td>
</tr>

<!-- 69 -->
<tr>
<td align="left">
  
`[heq]`

</td>
<td align="left">
  Hour Equal
  <br/>
  <br/>
  Checks if hour value is equal to provided hour
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[heq:12]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 70 -->
<tr>
<td align="left">
  
`[hne]`

</td>
<td align="left">
  Hour Not Equal
  <br/>
  <br/>
  Checks if hour value is not equal to provided hour
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[hne:12]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 71 -->
<tr>
<td align="left">
  
`[hgt]`

</td>
<td align="left">
  Hour Greater Than
  <br/>
  <br/>
  Checks if hour value is greater than provided hour
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[hgt:12]
  }`
});
// []
```
  
</td>
</tr>

<!-- 72 -->
<tr>
<td align="left">
  
`[hlt]`

</td>
<td align="left">
  Hour Less Than
  <br/>
  <br/>
  Checks if hour value is less than provided hour
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[hlt:12]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 73 -->
<tr>
<td align="left">
  
`[hgte]`

</td>
<td align="left">
  Hour Greater Than or Equal
  <br/>
  <br/>
  Checks if hour value is greater than or equal to provided hour
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[hgte:12]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 74 -->
<tr>
<td align="left">
  
`[hlte]`

</td>
<td align="left">
  Hour Less Than or Equal
  <br/>
  <br/>
  Checks if hour value is less than or equal to provided hour
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[hlte:12]
  }`
});
/*
[
  { statusDate: '2/8/2023 12:40:10' },
  { statusDate: '6/10/2024 05:23:34' }
]
*/
```
  
</td>
</tr>

<!-- 75 -->
<tr>
<td align="left">
  
`[hin]`

</td>
<td align="left">
  Hour In
  <br/>
  <br/>
  Checks if hour value matches any entry in hour array
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[hin:[1,2,5,6,8]]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 76 -->
<tr>
<td align="left">
  
`[hnin]`  

</td>
<td align="left">
  Hour Not In
  <br/>
  <br/>
  Checks if hour value matches no entry in hour array
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[hnin:[1,2,5,6,8]]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 77 -->
<tr>
<td align="left">
  
`[hinrange]`

</td>
<td align="left">
  Hour In Range
  <br/>
  <br/>
  Checks if hour value is in provided hour range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[hinrange:[1,7]]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 78 -->
<tr>
<td align="left">
  
`[hninrange]`

</td>
<td align="left">
  Hour Not In Range
  <br/>
  <br/>
  Checks if hour value is not in provided hour range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[hninrange:[1,7]]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 79 -->
<tr>
<td align="left">
  
`[mineq]`

</td>
<td align="left">
  Minute Equal
  <br/>
  <br/>
  Checks if minute value is equal to provided minute
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[mineq:40]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 80 -->
<tr>
<td align="left">
  
`[minne]`

</td>
<td align="left">
  Minute Not Equal
  <br/>
  <br/>
  Checks if minute value is not equal to provided minute
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[minne:40]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 81 -->
<tr>
<td align="left">
  
`[mingt]`

</td>
<td align="left">
  Minute Greater Than
  <br/>
  <br/>
  Checks if minute value is greater than provided minute
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[mingt:40]
  }`
});
// []
```
  
</td>
</tr>

<!-- 82 -->
<tr>
<td align="left">
  
`[minlt]`

</td>
<td align="left">
  Minute Less Than
  <br/>
  <br/>
  Checks if minute value is less than provided minute
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[minlt:40]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 83 -->
<tr>
<td align="left">
  
`[mingte]`

</td>
<td align="left">
  Minute Greater Than or Equal
  <br/>
  <br/>
  Checks if minute value is greater than or equal to provided minute
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[mingte:40]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 84 -->
<tr>
<td align="left">
  
`[minlte]`

</td>
<td align="left">
  Minute Less Than or Equal
  <br/>
  <br/>
  Checks if minute value is less than or equal to provided minute
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[minlte:40]
  }`
});
/*
[
  { statusDate: '2/8/2023 12:40:10' },
  { statusDate: '6/10/2024 05:23:34' }
]
*/
```
  
</td>
</tr>

<!-- 85 -->
<tr>
<td align="left">
  
`[minin]`

</td>
<td align="left">
  Minute In
  <br/>
  <br/>
  Checks if minute value matches any entry in minute array
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[minin:[1,10,23]]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 86 -->
<tr>
<td align="left">
  
`[minnin]`

</td>
<td align="left">
  Minute Not In
  <br/>
  <br/>
  Checks if minute value matches no entry in minute array
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[minnin:[1,10,23]]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 87 -->
<tr>
<td align="left">
  
`[mininrange]`

</td>
<td align="left">
  Minute In Range
  <br/>
  <br/>
  Checks if minute value is in provided minute range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[mininrange:[1,30]]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 88 -->
<tr>
<td align="left">
  
`[minninrange]`

</td>
<td align="left">
  Minute Not In Range
  <br/>
  <br/>
  Checks if minute value is not in provided minute range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[minninrange:[1,30]]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 89 -->
<tr>
<td align="left">
  
`[teq]`

</td>
<td align="left">
  Time Equal
  <br/>
  <br/>
  Checks if time value is equal to provided time
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[teq:"5:23:34"]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 90 -->
<tr>
<td align="left">
  
`[tne]`

</td>
<td align="left">
  Time Not Equal
  <br/>
  <br/>
  Checks if time value is not equal to provided time
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[tne:"5:23:34"]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 91 -->
<tr>
<td align="left">
  
`[tgt]`

</td>
<td align="left">
  Time Greater Than
  <br/>
  <br/>
  Checks if time value is greater than provided time
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[tgt:"5:23:34"]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 92 -->
<tr>
<td align="left">
  
`[tlt]`

</td>
<td align="left">
  Time Less Than
  <br/>
  <br/>
  Checks if time value is less than provided time
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[tlt:"5:23:34"]
  }`
});
// []
```
  
</td>
</tr>

<!-- 93 -->
<tr>
<td align="left">
  
`[tin]`

</td>
<td align="left">
  Time In
  <br/>
  <br/>
  Checks if time value matches any entry in time array
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[tin:["4:00:00", "5:23:34"]]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 94 -->
<tr>
<td align="left">
  
`[tnin]`

</td>
<td align="left">
  Time Not In
  <br/>
  <br/>
  Checks if time value matches no entry in time array
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[tnin:["4:00:00", "5:23:34"]]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 95 -->
<tr>
<td align="left">
  
`[tinrange]`

</td>
<td align="left">
  Time In Range
  <br/>
  <br/>
  Checks if time value is in provided time range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate
    [tinrange:["4:00:00", "5:30:35"]]
  }`
});
// [ { statusDate: '6/10/2024 05:23:34' } ]
```
  
</td>
</tr>

<!-- 96 -->
<tr>
<td align="left">
  
`[tninrange]`

</td>
<td align="left">
  Time Not In Range
  <br/>
  <br/>
  Checks if time value is not in provided time range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate
    [tninrange:["4:00:00", "5:30:35"]]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 97 -->
<tr>
<td align="left">
  
`[ago]`

</td>
<td align="left">
  Ago
  <br/>
  <br/>
  Checks if time matches provided time period
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[ago:"-5months"]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

<!-- 98 -->
<tr>
<td align="left">
  
`[agoin]`

</td>
<td align="left">
  Ago In
  <br/>
  <br/>
  Checks if time falls in a provided time period range
</td>
<td align="left">

```js
new Syntaxe({
  data: [
    {
      id: 1,
      status: 'success',
      statusDate: '2/8/2023 12:40:10'
    },
    {
      id: 2,
      status: 'failed',
      statusDate: '6/10/2024 05:23:34'
    }
  ],
  schema: `{
    statusDate[agoin:["5months", "2years"]]
  }`
});
// [ { statusDate: '2/8/2023 12:40:10' } ]
```
  
</td>
</tr>

</table>

## The COND operator

The cond operator is valuable for chaining multiple operations (that may not always evaluate to 'true' independently) to be executed on a value or an object's property. It helps determine the logic for returning data based on the condition(s).

The value for the operator can be `and` or `or`.

Default is `and`.

### Explanation by example

```js
// Data
const dateInfoArray = [
  {
    id: 1,
    status: 'success',
    statusDate: '2/8/2023 12:40:10' // Wed Feb 08 2023 12:40:10 GMT+0100 (West Africa Standard Time)
  },
  {
    id: 2,
    status: 'failed',
    statusDate: '6/10/2024 05:23:34' // Mon Jun 10 2024 05:23:34 GMT+0100 (West Africa Standard Time)
  }
];
```
```js
/*
Considering the default logic for [cond] is 'and', what we want to do is:
1. Return only id and statusDate properties for each object in the array
2. Each object is added to the resulting data ONLY IF ALL operations associated with 'statusDate' evaluate to true.
   The year must be '2024', the month must be 'October' and the day must be the 8th.
*/

const sx = new Syntaxe({
  data: dateInfoArray,
  schema: `{
    id
    statusDate [yeq:2024] [meq:"October"] [deq:8]
  }`
});
await sx.query();

/*
Result: []

The result is an empty array because all three operations associated with statusDate do not evaluate to true for any of the objects in the array.
*/
```
```js
/*
As opposed to the previous example, we will add the [cond] operator in this example and apply the 'or' logic. What we want to do is:
1. Return only id and statusDate properties for each object in the array
2. Each object is added to the resulting data IF AT LEAST ONE operation associated with 'statusDate' evaluates to true.
   The year can be '2024' or the month can be 'October' or the day can the 8th.
*/

const sx = new Syntaxe({
  data: dateInfoArray,
  schema: `{
    id
    statusDate [yeq:2024] [meq:"October"] [deq:8] [cond:"or"]
  }`
});
await sx.query();

/*
Result:
[
  { id: 1, statusDate: '2/8/2023 12:40:10' },
  { id: 2, statusDate: '6/10/2024 05:23:34' }
]

The resulting array contains two objects because the 'statusDate' in the first object matches the [deq:8] operation,
while the 'statusDate' in the second object matches the [yeq:2024] operation.
*/
```
