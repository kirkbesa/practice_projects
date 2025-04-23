"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
const readline_1 = require("../../utils/readline");
const users_1 = require("../../database/users");
const types_1 = require("../../types");
function addUser() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Type "exit" at any time to cancel user creation.');
        let newUser;
        // User ID generation logic
        // If user list is not empty, add 1 to last id, else set to 1
        const userId = users_1.users.length > 0 ? users_1.users[users_1.users.length - 1].id + 1 : 1;
        newUser = { id: userId, name: '', role: 'user' };
        // User Input Loop
        // Ask for Name
        while (true) {
            const nameInput = yield (0, readline_1.askQuestion)('Enter name: ');
            // Check for Exit
            if (nameInput === 'exit') {
                console.log('Exiting user creation...');
                return;
            }
            // Check for Empty
            if (!nameInput) {
                console.log('Name cannot be empty.');
                continue;
            }
            // Check for Starting with Space
            if (nameInput[0] === ' ') {
                console.log('Name cannot start with a space.');
                continue;
            }
            // Check for Starting with Number
            if (!isNaN(Number(nameInput[0]))) {
                console.log('Name cannot start with a number.');
                continue;
            }
            // Check for Existing Name
            const existingUser = users_1.users.find(user => user.name === nameInput);
            if (existingUser) {
                console.log('Name already taken, Please choose another.');
                continue;
            }
            newUser.name = nameInput; // Assign Name
            break;
        }
        // Ask for Role
        const rolesString = Object.values(types_1.UserRole).join('/'); // Dynamically Fetch Roles from UserRole enum
        while (true) {
            const roleInput = yield (0, readline_1.askQuestion)(`Enter role (${rolesString}): `);
            // Check for Exit
            if (roleInput === 'exit') {
                console.log('Exiting user creation...');
                return;
            }
            // Check for Empty
            if (!roleInput) {
                console.log('Role cannot be empty.');
                continue;
            }
            // Check for Valid Role
            if (!Object.values(types_1.UserRole).includes(roleInput)) {
                console.log(`Invalid role. Choose from: ${rolesString}`);
                continue;
            }
            newUser.role = roleInput; // Assign Role
            users_1.users.push(newUser); // Add New User
            console.log(`User: ${newUser.name} added successfully!`);
            return;
        }
    });
}
