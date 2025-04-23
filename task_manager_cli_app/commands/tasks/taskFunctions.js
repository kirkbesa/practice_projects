"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = addTask;
exports.displayTasks = displayTasks;
exports.deleteTask = deleteTask;
exports.assignTask = assignTask;
exports.updateTaskStatus = updateTaskStatus;
exports.findTaskById = findTaskById;
function addTask(taskInput, taskList) {
    taskList.push(taskInput);
    console.log(`Task: ${taskInput.title} - Successfully Added!`);
}
function displayTasks(tasks, key, value) {
    return tasks.filter(task => task[key] === value);
}
function deleteTask(taskId, taskList) {
    taskList.splice(taskList.findIndex(task => (task.taskId = taskId)), 1);
}
function assignTask(task, userId) {
    task.assignedTo = userId;
}
function updateTaskStatus(task, status) {
    task.status = status;
}
function findTaskById(taskId, taskList) {
    return taskList[taskList.findIndex(task => (task.taskId = taskId))];
}
