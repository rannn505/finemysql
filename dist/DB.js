'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mysql = require('mysql');
var promise = require('bluebird');
var immutable = require('immutable');

var MODULE_NAME = 'finemysql';

promise.promisifyAll(require('mysql/lib/Pool').prototype);
promise.promisifyAll(require('mysql/lib/Connection').prototype);

/**
 * The MYSQL DB class.
 * @param {object} options - Connection options fot the db (https://www.npmjs.com/package/mysql#connection-options)
 * @returns {DB}
 * @constructor
 */

var DB = exports.DB = function () {
    function DB() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, DB);

        this._pool = mysql.createPool(options);
    }

    _createClass(DB, [{
        key: '_getConnection',
        value: function _getConnection() {
            return this._pool.getConnectionAsync().disposer(function (connection) {
                return connection.destroy();
            });
        }
    }, {
        key: 'invoke',
        value: function invoke(query) {
            var escapeArr = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            return promise.using(this._getConnection(), function (connection) {
                return connection.queryAsync(query, escapeArr).then(function (data) {
                    return immutable.fromJS(data.map(function (row) {
                        return Object.assign({}, row);
                    }));
                });
            });
        }
    }]);

    return DB;
}();