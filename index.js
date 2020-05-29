var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

const Employee = require("./Employee");
const Role = require("./Role");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
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
        connection.query("INSERT INTO departments SET ?", {name: response.name}, function(err, res) {
            if (err) throw err;
            console.log(`${response.name} department added!`);
            init();
        })
    })
}

function addRole() {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        inquirer
        .prompt([{
            type: "input",
            message: "What is the name of the role you would like to add?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the yearly salary for this role?",
            name: "salary"
        },
        {
            type: "list",
            message: "Which department does this role belong to?",
            choices: function() {
                let departmentArr = [];
                for (let i=0; i<res.length; i++) {
                    departmentArr.push(res[i].name);
                }
                console.log()
                return departmentArr;
            },
            name: "department"
        }])
        .then(function(response) {
            //get department ID from name
            for (let i=0; i<res.length; i++) {
                if (response.department === res[i].name) {
                    var departmentId = i+1;
                    break;
                }
            };
            //create new Role object
            let newRole = new Role(response.title, response.salary, departmentId)
            connection.query("INSERT INTO roles SET ?", newRole, function(err, result) {
                if (err) throw err;
                console.log(`${response.title} role added!`);
                init();
            })
        })
    })
}

function addEmployee() {
    let query = "SELECT employees.id, employees.first_name, employees.last_name, roles.title";
    query += "FROM employees INNER JOIN roles ON employees.role_id = roles.id";
    connection.query(query, function(err, res) {
        if (err) throw err;
        inquirer
        .prompt([{
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
            choices: function() {
                let roleArr = [];
                for (let i=0; i<res.length; i++) {
                    roleArr.push(res[i].title);
                }
                return roleArr;
            },
            name: "role"
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices: function() {
                let employeeArr = [];
                for (let i=0; i<res.length; i++) {
                    employeeArr.push(`${res[i].first_name} ${res[i].last_name}`);
                }
                employeeArr.push("None");
                return employeeArr;
            },
            name: "manager"
        }])
        .then(function(response) {
            //get role id and manager id
            for (let i=0; i<res.length; i++) {
                if (response.role === res[i].title) {
                    var roleID = i+1;
                }
                if (response.manager === `${res[i].first_name} ${res[i].last_name}`) {
                    var managerID = i+1;
                }
            }
            //create new Employee object
            let newEmployee = new Employee(response.firstName, response.lastName, roleID, managerID);
            connection.query("INSERT INTO employees SET ?", newEmployee, function(err, result) {
                if (err) throw err;
                console.log(`${res[i].first_name} ${res[i].last_name} added to employees!`);
                init();
            })
        })
    })
}

//View all departments, roles, employees
function viewDepartments() {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        console.table("Departments", res);
        init();
    })
}

function viewRoles() {
    let query = "SELECT roles.id, roles.title, departments.name, roles.salary";
    query += "FROM roles INNER JOIN departments ON roles.department_id = departments.id ORDER BY roles.id";
    connection.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        console.table("Roles", res);
        init();
    })
}

function viewEmployees() {
    let query = "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary";
    query += "FROM employees INNER JOIN roles ON role.id = employees.role_id INNER JOIN departments ON roles.department_id = departments.id) ORDER BY employees.id";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table("Employees", res);
        init();
    })
}

//Update employee role
function updateEmployeeRole() {
    let query = "SELECT employees.first_name, employees.last_name, roles.title";
    query += "FROM employees INNER JOIN roles ON employees.role_id = roles.id";
    connection.query(query, function(err, res) {
        if (err) throw err;
        inquirer
        .prompt([{
            type: "list",
            message: "Which employee would you like to update?",
            choices: function() {
                let employeeArr = [];
                for (let i=0; i<res.length; i++) {
                    employeeArr.push(`${res[i].first_name} ${res[i].last_name}`);
                }
                return employeeArr;
            },
            name: "name"
        },
        {
            type: "input",
            message: "Select a new role to assign: ",
            choices: function() {
                let roleArr = [];
                for (let i=0; i<res.length; i++) {
                    roleArr.push(res[i].title);
                }
                return roleArr;
            },
            name: "role"
        }])
        .then(function(response) {
            //get role ID from title and employee ID from name
            for (let i=0; i<res.length; i++) {
                if (response.role === res[i].title) {
                    var roleId = i+1;
                }
                if (response.name === `${res[i].first_name} ${res[i].last_name}`) {
                    var employeeId = i+1;
                }
            }
            //Update role ID of Employee object
            connection.query("UPDATE employees SET ? WHERE ?", [{role_id: roleId},{id: employeeId}], function(err, result) {
                if (err) throw err;
                console.log(`${response.name}'s role has been updated to ${response.role}!`);
                init();
            })
        })
    })
}