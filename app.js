var consoleTable = require("console.table");
var mysql = require("mysql");
var inquirer = require("inquirer");
const { throwError } = require("rxjs");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "original1",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  menu();
});

function runSearch(x) {
  connection.query("select * from ??", [x], function (error, results, fields) {
    if (error) throw error;
    console.table(results);

    menu()
  });
}
function createEmployee(o) {
  connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) Values(?, ?, ?, ?)", [o.first_name, o.last_name, o.role_id, o.manager_id], function (error, results, fields) {
    if (error) throw error;
    console.table(results);
    menu()
  });

}

function deleteEmployee(o) {
  connection.query("DELETE FROM employee WHERE id = ?", [o.id], function (error, results, fields) {
    if (error) throw error;
    console.table(results);
    menu()
  });

}

var menuOptions = {
"show employee": function() {runSearch("employee")},
"show department": function() {runSearch("department")},
"show role": function() {runSearch("role")},
"add employee": function() {addEmployee()},
"remove employee": function() {removeEmployee()},
// "update employee": function() {},
// "show employees": function() {},

}

function menu() {
  inquirer
    .prompt([
      {
        type: "list",

        name: "action",

        message: "select an action",

        choices: Object.keys(menuOptions),
      },
    ])
    .then(function (response) {
      console.log(response);
      menuOptions[response.action]()

     
      
    });
}



function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name", 
        message: "First Name?", 
      },
      {
        type: "input",
        name: "last_name",
        message: "Last Name?", 
      },
      {
        type: "input",
        name: "role_id",
        message: "Role?",  
      },
      {
        type: "input",
        name: "manager_id",
        message: "Who is the manager?",
      },

    ])
    .then(function (response) {
      console.log(response);
     response.manager_id = parseInt(response.manager_id)
     response.role_id = parseInt(response.role_id)
     
     createEmployee(response)
    });
}

function removeEmployee() {
  connection.query("select * from ??", ["employee"], function (error, results, fields) {
    if (error) throw error;
    console.table(results);
//     var employees = results.map((item)=>{
// return {}

//     })
    inquirer
    .prompt([
      {
        type: "list",
        name: "id", 
        message: "Choose Employee to delete?", 
        choices: results.map((item)=>{return`${item.id}`})
      },
      

    ])
    .then(function (response) {
      console.log(response);
    
     
     deleteEmployee(response)
    });
  });
 
}




