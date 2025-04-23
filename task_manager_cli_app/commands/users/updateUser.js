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
exports.updateUser = updateUser;
const readline_1 = require("../../utils/readline");
const listUsers_1 = require("./listUsers");
const users_1 = require("../../database/users");
function updateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        if (users_1.users.length === 0) {
            (0, listUsers_1.listUsers)();
            return;
        }
        console.log('Type "exit" at any time to cancel user update.');
        let userToUpdate = -1;
        // Ask for ID
        while (true) {
            (0, listUsers_1.listUsers)();
            const userIdInput = yield (0, readline_1.askQuestion)('Select User ID to update: ');
            // Check for exit
            if (userIdInput === 'exit') {
                console.log('Exiting user update...');
                return;
            }
            // Check for Empty
            if (!userIdInput) {
                console.log('ID cannot be empty');
                continue;
            }
            // Check for Number
            const userIdInputNumber = Number(userIdInput);
            if (isNaN(userIdInputNumber)) {
                console.log('Invalid user ID. Please enter a number.');
                continue;
            }
            // Check for Existing Valid User ID
            userToUpdate = users_1.users.findIndex(user => user.id === userIdInputNumber);
            if (userToUpdate === -1) {
                console.log('Invalid user ID. User not found.');
                continue;
            }
            break;
        }
        // Ask what to update
        while (true) {
            const userToUpdateObject = users_1.users[userToUpdate];
            const updatableAttributes = Object.keys(userToUpdateObject).filter(key => key !== 'id');
            const attributeInput = yield (0, readline_1.askQuestion)(`Select attribute to update: ${updatableAttributes.join('/')}/all `);
            // Check for exit
            if (attributeInput === 'exit') {
                console.log('Exiting user update...');
                return;
            }
            // Check for both
        }
    });
}
