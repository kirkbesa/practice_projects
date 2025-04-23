"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttribute = updateAttribute;
exports.isValidRole = isValidRole;
exports.isValidName = isValidName;
exports.isEmpty = isEmpty;
exports.isExiting = isExiting;
function updateAttribute(object, attribute, value) {
    object[attribute] = value;
}
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
    // Check for Starting with Space
    if (input[0] === ' ') {
        console.log('Name cannot start with a space.');
        return false;
    }
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
function isEmpty(input) {
    // Check for Empty
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
