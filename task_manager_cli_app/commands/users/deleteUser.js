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
const helpers_1 = require("../../utils/helpers");
function deleteUser() {
    return __awaiter(this, void 0, void 0, function* () {
        if (users_1.users.length === 0) {
            (0, listUsers_1.listUsers)();
            return;
        }
        console.log('Type "exit" at any time to cancel user deletion.');
        let userToDelete = -1;
        // User Input Loop
        // Ask for ID
        while (true) {
            (0, listUsers_1.listUsers)();
            const userIdInput = yield (0, readline_1.askQuestion)('Enter user ID to delete: ');
            // Check for Exit
            if ((0, helpers_1.isExiting)(userIdInput)) {
                return;
            }
            // Check for Empty
            if ((0, helpers_1.isEmpty)(userIdInput)) {
                continue;
            }
            // Check for Number
            if (!(0, helpers_1.isNumber)(userIdInput)) {
                continue;
            }
            // Check for Existing Valid User ID
            if (!(0, helpers_1.isValidId)(userIdInput, users_1.users)) {
                continue;
            }
            userToDelete = Number(userIdInput) - 1;
            console.log(userToDelete);
            console.log(users_1.users[userToDelete]);
            break;
        }
        // Confirm Deletion
        while (true) {
            let confirmDeleteInput = yield (0, readline_1.askQuestion)(`Are you sure you want to delete ${users_1.users[userToDelete].name} - ${users_1.users[userToDelete].role}? (y/n): `);
            confirmDeleteInput = (0, helpers_1.cleanInput)(confirmDeleteInput);
            // Check for Exit
            if ((0, helpers_1.isExiting)(confirmDeleteInput)) {
                return;
            }
            // Check for Empty
            if ((0, helpers_1.isEmpty)(confirmDeleteInput)) {
                continue;
            }
            // Check for y/n
            if (!(0, helpers_1.isYesOrNo)(confirmDeleteInput)) {
                continue;
            }
            else {
                if (confirmDeleteInput === 'y' || confirmDeleteInput === 'yes') {
                    users_1.users.splice(userToDelete, 1); // Delete User
                    console.log('User deleted successfully.');
                    return;
                }
                if (confirmDeleteInput === 'n' || confirmDeleteInput === 'no') {
                    console.log('User deletion cancelled. Returning to main menu...');
                    return;
                }
            }
        }
    });
}
