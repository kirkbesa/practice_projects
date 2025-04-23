"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["MANAGER"] = "manager";
})(UserRole || (exports.UserRole = UserRole = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["UNASSIGNED"] = "unnassigned";
    TaskStatus["ASSIGNED"] = "assigned";
    TaskStatus["INPROGRESS"] = "in progress";
    TaskStatus["DONE"] = "done";
    TaskStatus["CANCELLED"] = "cancelled";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
