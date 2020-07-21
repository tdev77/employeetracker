USE employee_db;



INSERT INTO role (title, salary, department_id) Values ("Sale Lead", 10.20, 1);


INSERT INTO role (title, salary, department_id) Values ("Engineer", 40.20, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id) Values("Robert", "Johnson", 1,1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) Values("Sal", "Gambino", 2,2);



INSERT INTO department (name) Values ("Sales");
INSERT INTO department (name) Values ("Robotics");

SELECT * From role;
SELECT * From employee;
SELECT * From department;