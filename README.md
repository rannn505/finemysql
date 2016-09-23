<img height="64" width="64" src="https://raw.githubusercontent.com/rannn505/finemysql/master/assets/finemysql.png"> finemysql
===

[![Version npm](https://img.shields.io/npm/v/finemysql.svg?style=flat-square)](https://www.npmjs.com/package/finemysql)[![NPM Downloads](https://img.shields.io/npm/dt/finemysql.svg?style=flat-square)](https://www.npmjs.com/package/finemysql)[![Dependencies](https://img.shields.io/david/rannn505/finemysql.svg?style=flat-square)](https://david-dm.org/rannn505/finemysql)

>  A tiny mysql wrapper that adds capabilities of immutability, promises, and carefree connections management.

## Installation
```bash
$ npm i -S finemysql
```


## Quick start
```javascript
const mysql = require('../dist/index');

const db = new mysql({user: 'test', password: 'test', database: 'test'});

db.invoke('SELECT * FROM test')
    .then(data=> {
        console.log(data);
        console.log(data.isList()); //immutable Data
        console.log(data.first());
    });
```


## Goal

finemysql was created just to simplify the use of [nodejs driver for mysql][mysql].
it uses [bluebirdjs][] to convert old callbacks to promises, and [immutablejs][] to keep your data reliable and consistent throughout your app.
all those, along with a done right connections management, allow you to use [mysql][] easier than ever before. Enjoy!
[mysql]: https://www.npmjs.com/package/mysql
[bluebirdjs]: http://bluebirdjs.com/docs/getting-started.html
[immutablejs]: https://facebook.github.io/immutable-js/


## API

### DB Class `require('finemysql')`

#### initialize(constructor):
Creates a new db instance.
```javascript
const db = new mysql(options);
```
***for the options list please refer to [mysql module docs](https://www.npmjs.com/package/mysql#connection-options).***

#### Methods:
| Name     | Description                                           | Syntax                            | Return Value                                                                          |
|----------|-------------------------------------------------------|-----------------------------------|---------------------------------------------------------------------------------------|
| invoke() | Runs the query with the escapeArr on the db instance. | db.invoke(query, escapeArr = []); | A promise with the result (Immutable collection) (can also be rejected to the catch). |


## Examples

***for examples please look at the [example page](https://github.com/rannn505/finemysql/blob/master/example/example.js).***


## License

  [MIT](LICENSE)
