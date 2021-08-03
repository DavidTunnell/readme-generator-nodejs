const inquirer = require('inquirer');
const fs = require('fs');

const fileName = "README_test.md";

inquirer
    .prompt([{
        type: 'input',
        message: 'Provide a title for the project.',
        name: 'title'
    }, {
        type: 'input',
        message: 'Provide a description of the project.',
        name: 'description'
    }, {
        type: 'input',
        message: 'Provide installation instructions for the project.',
        name: 'installation'
    }, {
        type: 'input',
        message: 'Provide usage information for the project.',
        name: 'usage'
    }, {
        type: 'input',
        message: 'Provide license information for the project.',
        name: 'license'
    }, {
        type: 'input',
        message: 'Provide contribution guidelines for the project.',
        name: 'contribution'
    }, {
        type: 'input',
        message: 'Provide test instructions for the project.',
        name: 'test'
    }, {
        type: 'input',
        message: 'Provide your GitHub user name.',
        name: 'github'
    }, {
        type: 'input',
        message: 'Provide your email address.',
        name: 'email'
    }])
    .then((response) => {
        // Use user feedback for... whatever!!
        console.log(response);
        writeReadme(response);
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });

var writeReadme = (response) => {
    fs.writeFile(fileName, formatContent(response), (err) =>
        err ? console.error(err) : console.log('Success!')
    );
};
var formatContent = (response) => {
    return JSON.stringify(response);
    //each part of response + make a table of contents
    //license needs to be 'list of options'
    //Questions section
    // badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
}