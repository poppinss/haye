# Haye

![](http://i1117.photobucket.com/albums/k594/thetutlage/poppins-1_zpsg867sqyl.png)

[![Version](https://img.shields.io/npm/v/haye.svg?style=flat-square)](https://www.npmjs.com/package/haye)
[![Build Status](https://img.shields.io/travis/poppinss/haye/master.svg?style=flat-square)](https://travis-ci.org/poppinss/haye)
[![Coverage Status](https://img.shields.io/coveralls/poppinss/haye/master.svg?style=flat-square)](https://coveralls.io/github/poppinss/haye?branch=master)
[![Downloads](https://img.shields.io/npm/dt/haye.svg?style=flat-square)](https://www.npmjs.com/package/haye)
[![License](https://img.shields.io/npm/l/haye.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Support AdonisJs](https://img.shields.io/badge/support-adonisjs-brightgreen.svg?style=flat-square)](https://www.patreon.com/adonisframework)

Haye is an expressive string syntax to Array/Object and Vice-Versa parser for Javascript. Quite often you want your users to define some values using an **expressive string expression** instead of nesting values in an **array** or **object**.

> Want to build production ready apps with joy similar to ROR and Laravel. Try [AdonisJs](http://adonisjs.com/) an opinionated MVC framework for Node.js.

Expressive strings are great for Humans but not for machines/programs. Using `haye` you can convert them to machine readable objects/arrays.


## Expressions

Their are 2 types of string expressions `haye` will parse and return an array or object (based on your preference). 

### Pipe Expression

The pipe expression is quite popular by [Laravel](https://laravel.com/docs/validation) validation engine and also adopted by [Indicative](http://indicative.adonisjs.com/) a validation engine for Node.js

#### Pipe To Array
```javascript
const haye = require('haye')

const expression = 'required|min:10|max:20'
const parsedExp = haye.fromPipe(expression).toArray()
```

Returns 

```javascript
[
  {
    name: 'required',
    args: null
  }, {
    name: 'min',
    args: '10'
  }, {
    name: 'max',
    args: '20'
  }
]
```

#### Pipe To JSON

Also you can change the output format from an array to an object.


```javascript
const haye = require('haye')

const expression = 'required|min:10|max:20'
const parsedExp = haye.fromPipe(expression).toJSON()
```

Returns

```javascript
{
  required: null,
  min: '10',
  max: '20'
}
```

#### How about multiple values next to key?

```javascript
const haye = require('haye')

const expression = 'ranger:10,20'
const parsedExp = haye.fromPipe(expression).toArray()
```

Returns

```javascript
[{
  name: 'range',
  args: ['10', '20']
}]
```

The `toJSON` method on the same expression will return

```javascript
{
  range: ['10', '20']
}
```

### QS Expression
The reason I call it a `QS` expression, since it is quite similar to the query string instead you use `,` as a seperator instea of `&`.

#### QS To Array

```javascript
const haye = require('haye')

const expression = 'username=virk,firstname=harminder,lastname=virk'
const parsedExp = haye.fromQS(expression).toArray()
```

Returns 

```javascript
[
  {
    name: 'username',
    args: 'virk'
  }, {
    name: 'firstname',
    args: 'harminder'
  }, {
    name: 'lastname',
    args: 'virk'
  }
]
```

#### QS To JSON

Ofcourse you can get values back to a flat Object too.

```javascript
const haye = require('haye')

const expression = 'username=virk,firstname=harminder,lastname=virk'
const parsedExp = haye.fromQS(expression).toJSON()
```

Returns 

```javascript
{
  username: 'virk',
  firstname: 'harminder',
  lastname: 'virk'
}
```

#### Multiple Values
You can also define multiple values and they will be returned back as array.

```javascript
const haye = require('haye')

const expression = 'username=virk,likes=[javascript,ruby,haskell]'
const parsedExp = haye.fromQS(expression).toArray()
```

Returns 

```javascript
[
  {
    name: 'username',
    args: 'virk'
  }, {
    name: 'likes',
    args: ['javascript', 'ruby', 'haskell']
  }
]
```

And `toJSON` will return a flat object with likes as an array.

```javascript
{
  username: 'virk',
  likes: ['javascriot', 'ruby', 'haskell']
}
```

## Values To Expression (VICE-VERSA)

Also you can convert your arrays and objects back to `pipe` or `QS` expression.

### Pipe Expression

#### Array To Pipe

```javascript
const haye = require('haye')
const rules = [
  {
    name: 'min',
    args: 4
  }, {
    name: 'max',
    args: 10
  }
]

haye.fromArray(rules).toPipe()
```

Returns

```
'min:4|max:10'
```

#### JSON To Pipe

```javascript
const haye = require('haye')
const rules = {
  min: 4,
  max:10
}

haye.fromJSON(rules).toPipe()
```

Returns

```
'min:4|max:10'
```

### QS Expression

Just like the pipe expression, you can convert your arrays and objects to QS expression too.

#### Array To QS

```javascript
const haye = require('haye')
const user = [
  {
    name: 'username',
    args: 'virk'
  }, {
    name: 'likes',
    args: ['js', 'ruby']
  }
]

haye.fromArray(rules).toQS()
```

Returns

```
username=virk,likes=[js,ruby]
```

#### JSON To QS

```javascript
const haye = require('haye')
const user = {
  username: 'virk',
  likes: ['js', 'ruby']
}

haye.fromJSON(rules).toQS()
```

Returns

```
username=virk,likes=[js,ruby]
```
