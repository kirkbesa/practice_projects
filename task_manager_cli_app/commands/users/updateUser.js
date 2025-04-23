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
const helpers_1 = require("../../utils/helpers");
const listUsers_1 = require("./listUsers");
const users_1 = require("../../database/users");
const types_1 = require("../../types");
function updateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        if (users_1.users.length === 0) {
            (0, listUsers_1.listUsers)();
            return;
        }
        console.log('Type "exit" at any time to cancel user update.');
        let userToUpdateIndex = -1;
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
            userToUpdateIndex = users_1.users.findIndex(user => user.id === userIdInputNumber);
            if (userToUpdateIndex === -1) {
                console.log('Invalid user ID. User not found.');
                continue;
            }
            break;
        }
        // Ask what to update
        while (true) {
            const userToUpdateObject = users_1.users[userToUpdateIndex];
            const updatableAttributes = Object.keys(userToUpdateObject).filter(key => key !== 'id');
            const attributeInput = yield (0, readline_1.askQuestion)(`Select attribute to update: ${updatableAttributes.join('/')}/all `);
            // Check for exit
            if (attributeInput === 'exit') {
                console.log('Exiting user update...');
                return;
            }
            // Check for all
            if (attributeInput === 'all') {
                for (const attribute of updatableAttributes) {
                    while (true) {
                        let newInput = yield (0, readline_1.askQuestion)(`Type new value for ${attribute}: `);
                        // Check for Empty
                        if (!newInput) {
                            console.log(`${attribute} cannot be empty.`);
                            continue;
                        }
                        newInput = newInput.trim().toLowerCase();
                        // Check for valid role
                        if (attribute === 'role') {
                            const rolesString = Object.values(types_1.UserRole).join('/');
                            if (!(0, helpers_1.isValidRole)(newInput)) {
                                console.log(`Invalid Role. Please choose from: ${rolesString}`);
                                continue;
                            }
                        }
                        (0, helpers_1.updateAttribute)(userToUpdateObject, attribute, newInput);
                        break;
                    }
                }
                console.log('All attributes updated successfully.');
                return;
            }
            // Check for invalid attribute
            if (!updatableAttributes.includes(attributeInput.trim())) {
                console.log('Invalid attribute.');
                continue;
            }
        }
    });
}
