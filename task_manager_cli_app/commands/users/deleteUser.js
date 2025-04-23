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
exports.deleteUser = deleteUser;
const readline_1 = require("../../utils/readline");
const users_1 = require("../../database/users");
const listUsers_1 = require("./listUsers");
function deleteUser() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Type "exit" at any time to cancel user deletion.');
        let userToDelete = -1;
        // User Input Loop
        // Ask for ID
        while (true) {
            (0, listUsers_1.listUsers)();
            const userIdInput = yield (0, readline_1.askQuestion)('Enter user ID to delete: ');
            // Check for Exit
            if (userIdInput === 'exit') {
                console.log('Exiting user deletion...');
                return;
            }
            // Check for Empty
            if (!userIdInput) {
                console.log('User ID cannot be empty.');
                continue;
            }
            // Check for Number
            const userIdInputNumber = Number(userIdInput);
            if (isNaN(userIdInputNumber)) {
                console.log('Invalid user ID. Please enter a number.');
                continue;
            }
            // Check for Existing Valid User ID
            userToDelete = users_1.users.findIndex(user => user.id === userIdInputNumber);
            if (userToDelete === -1) {
                console.log('Invalid user ID. User not found.');
                continue;
            }
            break;
        }
        // Confirm Deletion
        while (true) {
            const confirmDeleteInput = yield (0, readline_1.askQuestion)(`Are you sure you want to delete ${users_1.users[userToDelete].name} - ${users_1.users[userToDelete].role}? (y/n): `);
            // Check for Exit
            if (confirmDeleteInput === 'exit') {
                console.log('Exiting user deletion...');
                return;
            }
            // Check for Empty
            if (!confirmDeleteInput) {
                console.log('Confirmation cannot be empty.');
                continue;
            }
            // Check for y/n
            if (confirmDeleteInput.toLowerCase() === 'y') {
                users_1.users.splice(userToDelete, 1); // Delete User
                console.log('User deleted successfully.');
                return;
            }
            else if (confirmDeleteInput.toLowerCase() === 'n') {
                console.log('User deletion cancelled.');
                deleteUser(); // Restart the process
            }
            else {
                console.log('Invalid input. Please enter "y" or "n".');
            }
        }
    });
}
