"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandList = void 0;
const addUser_1 = require("./users/addUser");
const listUsers_1 = require("./users/listUsers");
const deleteUser_1 = require("./users/deleteUser");
const updateUser_1 = require("./users/updateUser");
const createTask_1 = require("./tasks/createTask");
const commandList = {
    'add user': addUser_1.addUser,
    'list users': listUsers_1.listUsers,
    'delete user': deleteUser_1.deleteUser,
    'update user': updateUser_1.updateUser,
    'create task': createTask_1.createTask,
};
exports.commandList = commandList;
