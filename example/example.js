const mysql = require('../dist/index');

const db = new mysql({user: 'test', password: 'test', database: 'test'});

db.invoke('SELECT * FROM test')
    .then(data=> {
        console.log(data);
        console.log(data.isList()); //immutable Data
        console.log(data.first());
    });

db.invoke('SELECT * FROM test Where id = ?', [1])
    .then(data=> {
        console.log(data);
        console.log(data.isList()); //immutable Data
        console.log(data.first());
    });
