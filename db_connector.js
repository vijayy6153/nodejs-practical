'use strict';

var mysql = require('mysql');
var constant = require('./config/web-config');

console.log('constant.connectionString: ', constant.connectionString)
var connection = mysql.createConnection(
    constant.connectionString
    
    );
connection.connect((err) => {
    if (err) throw err;
    console.log('DB Connected!');
});

module.exports = connection;
