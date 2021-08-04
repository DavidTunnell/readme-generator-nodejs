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
        type: 'list',
        message: 'Provide which open source license type the project will use.',
        name: 'license',
        choices: ['Apache License 2.0', 'BSD 3-Clause "New" or "Revised" license', 'BSD 2-Clause "Simplified" or "FreeBSD" license', 'GNU General Public License (GPL)', 'GNU Library or "Lesser" General Public License (LGPL)', 'MIT license', 'Mozilla Public License 2.0', 'Common Development and Distribution License', 'Eclipse Public License version 2.0']
    }, {
        type: 'input',
        message: 'Provide contribution guidelines for the project.',
        name: 'contribution'
    }, {
        type: 'input',
        message: 'Provide test instructions for the project.',
        name: 'tests'
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
        writeReadme(fileName, response);
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });

var writeReadme = (fileName, response) => {
    fs.writeFile(fileName, formatContent(response), (err) =>
        err ? console.error(err) : console.log('Successfully printed: ' + fileName)
    );
};
var formatContent = (response) => {
    const lineBreak = "<br />";
    //each part of response + make a table of contents
    let constructedString = "<h1>" + response.title + "</h1>" + lineBreak +
        "<h2>Description</h2>" + lineBreak +
        "<p>" + "<img src='https://img.shields.io/badge/Apache-License%202.0%20-Blue'>" + "</p>" +
        "<p>" + response.description + "</p>" + lineBreak +
        "<h2>Table of Contents</h2>" + lineBreak +
        "<ul><li><a href='#installation'>Installation</a></li>" +
        "<li><a href='#usage'>Usage</a></li>" +
        "<li><a href='#license'>License</a></li>" +
        "<li><a href='#contributing'>Contributing</a></li>" +
        "<li><a href='#tests'>Tests</a></li>" +
        "<li><a href='#questions'>Questions</a></li></ul>" +
        "<h2 id='installation'>Installation</h2>" +
        "<p>" + response.installation + "</p>" + lineBreak +
        "<h2 id='usage'>Usage</h2>" +
        "<p>" + response.usage + "</p>" + lineBreak +
        "<h2 id='license'>License</h2>" +
        "<p>" + response.license + "</p>" + lineBreak +
        "<h2 id='contributing'>Contributing</h2>" +
        "<p>" + response.contribution + "</p>" + lineBreak +
        "<h2 id='tests'>Tests</h2>" +
        "<p>" + response.tests + "</p>" + lineBreak +
        "<h2 id='questions'>Questions</h2>" +
        "<p>Do you have any questions or comments?</p>" +
        "<ul><li>GitHub Profile: <a href='https://github.com/" + response.github + "'>" + response.github + "</a></li>" +
        "<li>Email: <a href='mailto: " + response.email + "'>" + response.email + "</a></li></ul>";
    //license needs to be 'list of options'
    //Questions section
    // badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under

    return constructedString;
}