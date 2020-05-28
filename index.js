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
            "Update employee role",
            "Exit"
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
        case "Exit":
            console.log("Your changes have been saved!")
            connection.end();
            break;
        }
    });
}

//Add department, role, or employee
function addDepartment() {
    inquirer
    .prompt({
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "name"
    })
    .then(function(response) {

        init();
    })
}

function addRole() {
    inquirer
    .prompt({
        type: "input",
        message: "What is the name of the role you would like to add?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the yearly salary for this role?",
        name: "salary"
    },
    {
        type: "list",
        message: "Which department does this role belong to?",
        choices: [],
        name: "department"
    })
    .then(function(response) {

        init();
    })
}

function addEmployee() {
    inquirer
    .prompt(    {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
    },
    {
        type: "list",
        message: "What is the employee's role?",
        choices: [],
        name: "role"
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        choices: [],
        name: "manager"
    })
    .then(function(response) {

        init();
    })
}

//View all departments, roles, employees
function viewDepartments() {
    init();
}

function viewRoles() {
    init();
}

function viewEmployees() {
    init();
}

//Update employee role
function updateEmployeeRole() {
    init();
}