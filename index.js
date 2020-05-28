var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "employeesDB"
});

connection.connect(function(err) {
    if (err) throw err;
    init();
});

function init() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add new department",
            "Add new role",
            "Add new employee",
            "View all departments",
            "View all roles",
            "View all employees",
            "Update employee role"
        ]
    })
    .then(function(response) {
        switch (response.action) {
        case "Add new department":
            addDepartment();
            break;
  
        case "Add new role":
            addRole();
            break;
  
        case "Add new employee":
            addEmployee();
            break;
  
        case "View all departments":
            viewDepartments();
            break;

        case "View all roles":
            viewRoles();
            break;

        case "View all employees":
            viewEmployees();
            break;
        case "Update employee role":
            updateEmployeeRole();
            break;
        }
    });
}