const mysql     = require('mysql');
const promise   = require('bluebird');
const immutable = require('immutable');

const MODULE_NAME = 'finemysql';

promise.promisifyAll(require('mysql/lib/Pool').prototype);
promise.promisifyAll(require('mysql/lib/Connection').prototype);

/**
 * The MYSQL DB class.
 * @param {object} options - Connection options fot the db (https://www.npmjs.com/package/mysql#connection-options)
 * @returns {DB}
 * @constructor
 */
export class DB {
    constructor(options = {}) {
        this._pool = mysql.createPool(options);
    }
    _getConnection() {
        return this._pool.getConnectionAsync().disposer(connection=> connection.destroy());
    }
    invoke(query, escapeArr = []) {
        return promise.using(this._getConnection(), connection=> {
            return connection.queryAsync(query, escapeArr)
                    .then(data=> immutable.fromJS(data.map(row=> Object.assign({}, row))));
        });
    }
}
