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
            if ((0, helpers_1.isExiting)(userIdInput))
                return;
            // Check if empty, if number, if existing id
            if ((0, helpers_1.isEmpty)(userIdInput) || !(0, helpers_1.isNumber)(userIdInput) || !(0, helpers_1.isValidId)(userIdInput, users_1.users))
                continue;
            userToUpdateIndex = Number(userIdInput) - 1;
            console.log(`Updating: ${users_1.users[userToUpdateIndex].name} - ${users_1.users[userToUpdateIndex].role}`);
            break;
        }
        // Ask what to update
        while (true) {
            const userToUpdateObject = users_1.users[userToUpdateIndex];
            const updatableAttributes = Object.keys(userToUpdateObject).filter(key => key !== 'id');
            let attributeInput = yield (0, readline_1.askQuestion)(`Select attribute to update (${updatableAttributes.join('/')}/all): `);
            attributeInput = (0, helpers_1.cleanInput)(attributeInput);
            // Check for Exit
            if ((0, helpers_1.isExiting)(attributeInput))
                return;
            // Check for Empty
            if ((0, helpers_1.isEmpty)(attributeInput))
                continue;
            // Check for All
            if (attributeInput === 'all') {
                for (const attribute of updatableAttributes) {
                    while (true) {
                        let newInput = yield (0, readline_1.askQuestion)(`Type new value for ${attribute}: `);
                        newInput = (0, helpers_1.cleanInput)(newInput);
                        // Check for exit
                        if ((0, helpers_1.isExiting)(newInput))
                            return;
                        // Check for Empty
                        if ((0, helpers_1.isEmpty)(newInput))
                            continue;
                        if (attribute === 'name') {
                            if (!(0, helpers_1.isValidName)(newInput))
                                continue;
                        }
                        // Check for valid role
                        if (attribute === 'role') {
                            if (!(0, helpers_1.isValidRole)(newInput))
                                continue;
                        }
                        (0, helpers_1.updateAttribute)(userToUpdateObject, attribute, newInput);
                        break;
                    }
                }
                console.log(`${userToUpdateObject.name} - ${userToUpdateObject.role} updated successfully.`);
                return;
            }
            // Check for invalid attribute
            if (!updatableAttributes.includes(attributeInput)) {
                console.log('Invalid attribute.');
                continue;
            }
            // Check for single attribute selection
            while (true) {
                let question;
                if (attributeInput === 'role') {
                    question = `Type new value for ${attributeInput} (${Object.values(types_1.UserRole).join('/')}): `;
                }
                else {
                    question = `Type new value for ${attributeInput}: `;
                }
                let newInput = yield (0, readline_1.askQuestion)(question);
                newInput = (0, helpers_1.cleanInput)(newInput);
                // Check for exit
                if ((0, helpers_1.isExiting)(newInput))
                    return;
                // Check for Empty
                if ((0, helpers_1.isEmpty)(newInput))
                    continue;
                if (attributeInput === 'name') {
                    if (!(0, helpers_1.isValidName)(newInput))
                        continue;
                }
                // Check for valid role
                if (attributeInput === 'role') {
                    if (!(0, helpers_1.isValidRole)(newInput))
                        continue;
                }
                (0, helpers_1.updateAttribute)(userToUpdateObject, attributeInput, newInput);
                console.log(`${userToUpdateObject.name} - ${userToUpdateObject.role} updated successfully.`);
                return;
            }
        }
    });
}
