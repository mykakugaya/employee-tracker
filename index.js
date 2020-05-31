var inquirer = require("inquirer");
require("console.table");
const db = require('./config/orm');

const addPrompt ={
    'department': ()=>addDepartment(),
    'role': ()=>addRole(),
    'employee': ()=>addEmployee(),
}
const viewPrompt ={
    'departments': ()=>viewDepartments(),
    'roles': ()=>viewRoles(),
    'employees': ()=>viewEmployees()
}
init();

async function init() {
    try{
        const {action} = await inquirer
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
        });
        switch (action.split(' ')[0]) {
        case "Add":
            await addPrompt[action.split(' ')[2]]();
            setTimeout(init, 2000);
            break;
        case "View":
            await viewPrompt[action.split(' ')[2]]();
            setTimeout(init, 2000);
            break;
        case "Update":
            await updateEmployeeRole();
            setTimeout(init, 2000);
            break;
        case "Exit":
            console.log("Your changes have been saved!");
            return;
        }
    } catch(err) {
        console.log(err);
    }
}

//Add department, role, or employee
async function addDepartment() {
    try{
        let data = await inquirer
        .prompt({
            type: "input",
            message: "What is the name of the department you would like to add?",
            name: "name"
        });
        await db.addOne('departments', data);
        console.log(`${data.name} has been added to departments!`);
    } catch(err) {
        console.log(err);
    }
}

async function addRole() {
    try{
        const depttable = await db.viewAll('departments');
        const deptoptions = depttable.reduce((a,b)=>(a[b.name]=b.id,a),{});
        let data = await inquirer
            .prompt([{
                type: "input",
                message: "What is the name of the role you would like to add?",
                name: "title"
            },
            {
                type: "input",
                message: "What is the annual salary for this role?",
                name: "salary"
            },
            {
                type: "list",
                message: "Which department does this role belong to?",
                choices: Object.keys(deptoptions),
                name: "department_id"
            }]);
        await db.addOne('roles', {...data, department_id:deptoptions[data.department_id]});
        console.log(`${data.title} has been added to roles in ${data.department_id}!`);
    } catch(err) {
        console.log(err);
    }
}

async function addEmployee() {
    try{
        let table = await db.viewAllEmp();
        let roles = table.reduce((a,b)=>(a[b.title]=b.rid,a),{});
        let mans = table.reduce((a,b)=> (a[`${b.first_name} ${b.last_name}`]=b.id,a),{});
        let data = await inquirer
            .prompt([{
                type: "input",
                message: "What is the employee's first name?",
                name: "first_name"
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "last_name"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                choices: Object.keys(roles),
                name: "role_id"
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                choices: [...Object.keys(mans),"none"],
                name: "manager_id"
            }]);
        await db.addOne('employees', {...data, role_id:roles[data.role_id], manager_id:mans[data.manager_id]||null});
        console.log(`${data.first_name} ${data.last_name} has been added to employees!`)
    } catch(err) {
        console.log(err);
    }
}

//View all departments, roles, employees
async function viewDepartments() {
    try{
        const deptdata = await db.viewAll('departments');
        console.table("Departments", deptdata);
    } catch(err) {
        console.log(err);
    }
}

async function viewRoles() {
    try{
        const rolesdata = await db.viewRoles();
        console.table("Roles", rolesdata);
    } catch(err) {
        console.log(err);
    }
}

async function viewEmployees() {
    try{
        const employeesdata = await db.viewEmployees();
        console.table("Employees", employeesdata);
    } catch(err) {
        console.log(err);
    }
}

//Update employee role
async function updateEmployeeRole() {
    try{
        let table1 = await db.viewAllEmp();
        let roleList = table1.reduce((a,b)=>(a[b.title]=b.rid,a),{});
        let employeeList = table1.reduce((a,b)=> (a[`${b.first_name} ${b.last_name}`]=b.id,a),{});
        let data = await inquirer
            .prompt([{
                type: "list",
                message: "Which employee would you like to update?",
                choices: Object.keys(employeeList),
                name: "name"
            },
            {
                type: "list",
                message: "Select a new role to assign: ",
                choices: Object.keys(roleList),
                name: "role_id"
            }]);
        let firstnameObj = {first_name: data.name.split(' ')[0]};
        let lastnameObj = {last_name: data.name.split(' ')[1]};
        await db.update({role_id: roleList[data.role_id]}, firstnameObj, lastnameObj);
        console.log(`${data.name} has been updated to ${data.role_id}!`)
    } catch(err) {
        console.log(err);
    }
}