"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttribute = updateAttribute;
exports.generateID = generateID;
exports.isValidRole = isValidRole;
exports.isValidName = isValidName;
exports.isValidId = isValidId;
exports.isYesOrNo = isYesOrNo;
exports.isEmpty = isEmpty;
exports.isExiting = isExiting;
exports.isNumber = isNumber;
exports.cleanInput = cleanInput;
function updateAttribute(object, attribute, value) {
    object[attribute] = value;
}
// Generators
function generateID(list) {
    return list.length > 0 ? list[list.length - 1].id + 1 : 1;
}
// Input Validators
const types_1 = require("../types");
function isValidRole(input) {
    if (!Object.values(types_1.UserRole).includes(input)) {
        console.log(`Invalid Role. Please choose from: ${Object.values(types_1.UserRole).join('/')}`);
        return false;
    }
    return true;
}
const users_1 = require("../database/users");
function isValidName(input) {
    // Check for Starting with Number
    if (!isNaN(Number(input[0]))) {
        console.log('Name cannot start with a number.');
        return false;
    }
    // Check for Existing Name
    const existingUser = users_1.users.find(user => user.name === input);
    if (existingUser) {
        console.log('Name already taken, Please choose another.');
        return false;
    }
    return true;
}
function isValidId(input, list) {
    const indexFound = list.findIndex(element => element.id === Number(input));
    if (indexFound === -1) {
        console.log('Invalid ID. ID not found.');
        return false;
    }
    return true;
}
function isYesOrNo(input) {
    const allowedInputs = ['y', 'yes', 'n', 'no'];
    if (!allowedInputs.includes(input.toLowerCase())) {
        console.log('Invalid Input. Choose y or n only.');
        return false;
    }
    return true;
}
function isEmpty(input) {
    if (!input || input.trim() === '') {
        console.log('Input cannot be empty.');
        return true;
    }
    return false;
}
function isExiting(input) {
    if (input === 'exit') {
        console.log('Exiting current process...');
        return true;
    }
    return false;
}
function isNumber(input) {
    if (isNaN(Number(input))) {
        console.log('Please enter a number');
        return false;
    }
    return true;
}
function cleanInput(input) {
    return input.trim().toLowerCase();
}
