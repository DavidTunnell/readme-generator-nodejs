//imports
const inquirer = require('inquirer');
const fs = require('fs');

//set file name that will be written
const fileName = "README_test.md";

//license choices and details
const licenses = [{ name: 'Apache License 2.0', url: "https://opensource.org/licenses/Apache-2.0" },
    { name: 'BSD 3-Clause "New" or "Revised" license', url: "https://opensource.org/licenses/BSD-3-Clause" },
    { name: 'BSD 2-Clause "Simplified" or "FreeBSD license', url: "https://opensource.org/licenses/BSD-2-Clause" },
    { name: 'GNU General Public License (GPL)', url: "https://opensource.org/licenses/gpl-license" },
    { name: 'GNU Library or "Lesser" General Public License (LGPL)', url: "https://opensource.org/licenses/lgpl-license" },
    { name: 'MIT license', url: "https://opensource.org/licenses/MIT" },
    { name: 'Mozilla Public License 2.0', url: "https://opensource.org/licenses/MPL-2.0" },
    { name: 'Common Development and Distribution License', url: "https://opensource.org/licenses/CDDL-1.0" },
    { name: 'Eclipse Public License version 2.0', url: "https://opensource.org/licenses/EPL-2.0" }
];

//prompt users for questions regarding the readme file generation
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
        choices: licenses
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
        // format and write file
        writeReadme(fileName, response);
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment.");
        } else {
            console.error("Another error occurred. " + error);
        }
    });

//write file to drive in same location as index.js
var writeReadme = (fileName, response) => {
    fs.writeFile(fileName, formatContent(response), (err) =>
        err ? console.error(err) : console.log('Successfully wrote ' + fileName + " in the current directory.")
    );
};

//construct HTML for the README file
var formatContent = (response) => {
    const lineBreak = "<br />";
    //each part of response + make a table of contents
    const licenseUrl = licenses.find(x => x.name === response.license).url;
    let constructedString = "<h1>" + response.title + "</h1>" + lineBreak +
        "<h2>Description</h2>" + lineBreak +
        "<p>" + "<a href='" + licenseUrl + "'><img src='https://img.shields.io/badge/" + formatForShieldCall(response.license) + "'></a></p>" +
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
        "<p><a href='" + licenseUrl + "'>" + response.license + "</a></p>" + lineBreak +
        "<h2 id='contributing'>Contributing</h2>" +
        "<p>" + response.contribution + "</p>" + lineBreak +
        "<h2 id='tests'>Tests</h2>" +
        "<p>" + response.tests + "</p>" + lineBreak +
        "<h2 id='questions'>Questions</h2>" +
        "<p>Do you have any questions or comments?</p>" +
        "<ul><li>GitHub Profile: <a href='https://github.com/" + response.github + "'>" + response.github + "</a></li>" +
        "<li>Email: <a href='mailto: " + response.email + "'>" + response.email + "</a></li></ul>";
    return constructedString;
}

//format shield.io badge url from user entry
var formatForShieldCall = (str) => {
    const arrayOfWords = str.replace(/-/g, ' ').split(" ");
    let formattedString = arrayOfWords[0] + "-";
    for (let i = 1; i < arrayOfWords.length; i++) {
        formattedString += arrayOfWords[i] + "%20";
    }
    formattedString += "-Blue";
    return formattedString;
};