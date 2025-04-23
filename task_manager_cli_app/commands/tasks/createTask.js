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
exports.createTask = createTask;
const readline_1 = require("../../utils/readline");
const taskFunctions_1 = require("./taskFunctions");
const helpers_1 = require("../../utils/helpers");
const tasks_1 = require("../../database/tasks");
const users_1 = require("../../database/users");
const listUsers_1 = require("../users/listUsers");
function createTask() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Type "exit" at any time to cancel task creation.');
        // Task ID generation logic
        const taskId = (0, helpers_1.generateID)(tasks_1.tasks);
        let newTask = {
            taskId: taskId,
            title: '',
            assignedTo: undefined,
            status: 'unassigned',
        };
        // User Input Loop
        // Ask for Title
        while (true) {
            let taskTitleInput = yield (0, readline_1.askQuestion)('Enter Task Title: ');
            // Validation
            taskTitleInput = taskTitleInput.trim();
            if ((0, helpers_1.isExiting)(taskTitleInput))
                return;
            if ((0, helpers_1.isEmpty)(taskTitleInput))
                continue;
            newTask.title = taskTitleInput;
            break;
        }
        // Ask for who to assign to
        while (true) {
            (0, listUsers_1.listUsers)();
            console.log('Type "none" to assign to no one yet');
            let assignToInput = yield (0, readline_1.askQuestion)('Assign to User ID: ');
            // Validation
            assignToInput = (0, helpers_1.cleanInput)(assignToInput);
            if ((0, helpers_1.isExiting)(assignToInput))
                return;
            if ((0, helpers_1.isEmpty)(assignToInput)) {
                continue;
            }
            else {
                if (assignToInput === 'none') {
                    newTask.assignedTo = undefined;
                }
                else {
                    if (!(0, helpers_1.isNumber)(assignToInput))
                        continue;
                    if (!(0, helpers_1.isValidId)(assignToInput, users_1.users))
                        continue;
                }
            }
            newTask.assignedTo = Number(assignToInput);
            // Set Status
            if (newTask.assignedTo === undefined) {
                newTask.status = 'unassigned';
            }
            else {
                newTask.status = 'assigned';
            }
            break;
        }
        (0, taskFunctions_1.addTask)(newTask, tasks_1.tasks);
        return;
    });
}
