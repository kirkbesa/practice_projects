"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandList = void 0;
const addUser_1 = require("./users/addUser");
const listUsers_1 = require("./users/listUsers");
const commandList = {
    'add user': addUser_1.addUser,
    'list users': listUsers_1.listUsers,
};
exports.commandList = commandList;
