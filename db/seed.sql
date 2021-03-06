INSERT INTO departments (name) VALUES ("Sales");
INSERT INTO departments (name) VALUES ("Engineering");
INSERT INTO departments (name) VALUES ("Finance");
INSERT INTO departments (name) VALUES ("Legal");

INSERT INTO roles (title, salary, department_id) VALUES ("Sales Lead", 100000.00, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Salesperson", 70000.00, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Lead Engineer", 160000.00, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Software Engineer", 120000.00, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Engineering Intern", 80000.00, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Account Manager", 165000.00, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Accountant", 120000.00, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Legal Team Lead", 250000.00, 4);
INSERT INTO roles (title, salary, department_id) VALUES ("Lawyer", 200000.00, 4);

INSERT INTO employees (first_name, last_name, role_id) VALUES ("Mark", "Johnson", 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Angela", "Smith", 2, 1);
INSERT INTO employees (first_name, last_name, role_id) VALUES ("Kevin", "Park", 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Allen", 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("John", "Deer", 5, 3);
INSERT INTO employees (first_name, last_name, role_id) VALUES ("Paul", "Doe", 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Tyler", "Chen", 7, 6);
INSERT INTO employees (first_name, last_name, role_id) VALUES ("Sarah", "Hall", 8);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Tom", "Sanders", 9, 8);