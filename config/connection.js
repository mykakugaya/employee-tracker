var mysql = require("mysql");
const util = require('util');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeesDB"
});

connection.connect(function(err) {
    if (err) throw err;
});

connection.query = util.promisify(connection.query);

module.exports = connection;