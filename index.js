var inquirer = require('inquirer');
const fs = require('fs');

inquirer
    .prompt([{
        type: 'input',
        message: 'What is your user name?',
        name: 'username',
    }])
    .then((response) => {
        // Use user feedback for... whatever!!
        console.log(response);
        write(response);
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });

var write = (response) => {
    fs.writeFile('log.txt', JSON.stringify(response), (err) =>
        err ? console.error(err) : console.log('Success!')
    );
};