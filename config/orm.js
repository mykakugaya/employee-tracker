const connection = require('./connection');

const db = {
    viewAll: (table)=> connection.query(`SELECT * FROM ${table}`),
    viewRoles: ()=> connection.query("SELECT roles.id, roles.title, departments.name, roles.salary FROM roles INNER JOIN departments ON roles.department_id = departments.id ORDER BY roles.id"),
    viewEmployees: ()=> connection.query("SELECT employees.first_name, employees.last_name, roles.title, departments.name, roles.salary FROM roles INNER JOIN employees ON roles.id = employees.role_id INNER JOIN departments ON roles.department_id = departments.id ORDER BY roles.id"),
    viewAllEmp: ()=> connection.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.id AS rid FROM roles INNER JOIN employees ON roles.id = employees.role_id"),
    addOne: (table,obj)=> connection.query(`INSERT INTO ${table} SET ?`, obj),
    update: (roleObj, firstnameObj, lastnameObj)=>connection.query("UPDATE employees SET ? WHERE ? AND ?", [roleObj, firstnameObj, lastnameObj])
}

module.exports = db;