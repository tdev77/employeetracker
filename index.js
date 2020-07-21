const Manager = require("./lib/Manager");

const Engineer = require("./lib/Engineer");

const Intern = require("./lib/Intern");

const inquirer = require("inquirer");

const path = require("path");

const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");

const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const menuOptions = ["Manager", "Engineer", "Intern", "Render", "Exit"];

const employees = [];

const managerQuestions = [
  {
    type: "input",

    name: "name",

    message: "Manager Name?",
  },
  {
    type: "input",

    name: "id",

    message: "ID Number?",
  },
  {
    type: "input",

    name: "email",

    message: "Email Address?",
  },
  {
    type: "input",

    name: "officeNumber",

    message: "Office Number?",
  },
];

const engineerQuestions = [
  {
    type: "input",

    name: "name",

    message: "Engineer Name?",
  },
  {
    type: "input",

    name: "id",

    message: "ID Number?",
  },
  {
    type: "input",

    name: "email",

    message: "Email Address?",
  },
  {
    type: "input",

    name: "github",

    message: "GitHub Name?",
  },
];

const internQuestions = [
  {
    type: "input",

    name: "name",

    message: "Intern Name?",
  },

  {
    type: "input",

    name: "id",

    message: "ID Number?",
  },

  {
    type: "input",

    name: "email",

    message: "Email Address?",
  },

  {
    type: "input",

    name: "github",

    message: "GitHub Name?",
  },
  {
    type: "input",

    name: "school",

    message: "School Name?",
  },
];

menu();

function menu() {
  inquirer
    .prompt([
      {
        type: "list",

        name: "action",

        message: "select an action",

        choices: menuOptions,
      },
    ])
    .then(function (response) {
      console.log(response);

      if (response.action == "Engineer") {
        addEngineer();
      }

      if (response.action == "Manager") {
        addManager();
      }

      if (response.action == "Intern") {
        addIntern();
      }

      if (response.action == "Render") {
        var html = render(employees);

        console.log(html);

        fs.writeFile("./output/team.html", html, function (err) {
          if (err) return console.log(err);

          console.log("Success!");
        });
      }
    });
}

function addEngineer() {
  inquirer.prompt(engineerQuestions).then(function (response) {
    console.log(response);

    var newEngineer = new Engineer(
      response.name,
      response.id,
      response.email,
      response.github
    );

    employees.push(newEngineer);

    console.log(employees);

    menu();
  });
}

function addManager() {
  inquirer.prompt(managerQuestions).then(function (response) {
    console.log(response);

    var newManager = new Manager(
      response.name,
      response.id,
      response.email,
      response.officeNumber
    );

    employees.push(newManager);

    console.log(employees);

    menu();
  });
}

function addIntern() {
  inquirer.prompt(internQuestions).then(function (response) {
    console.log(response);

    var newIntern = new Intern(
      response.name,
      response.id,
      response.email,
      response.school
    );

    employees.push(newIntern);

    console.log(employees);

    menu();
  });
}
