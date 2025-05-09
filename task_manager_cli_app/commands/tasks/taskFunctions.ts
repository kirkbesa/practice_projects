import { Task, Status } from '../../types'

function addTask(taskInput: Task, taskList: Task[]): void {
    taskList.push(taskInput)
    console.log(`Task: ${taskInput.title} - Successfully Added!`)
}

function displayTasks<Task extends object>(tasks: Task[], key: keyof Task, value: any): Task[] {
    return tasks.filter(task => task[key] === value)
}

function deleteTask(taskId: number, taskList: Task[]): void {
    taskList.splice(
        taskList.findIndex(task => (task.taskId = taskId)),
        1
    )
}

function assignTask(task: Task, userId: number): void {
    task.assignedTo = userId
}

function updateTaskStatus(task: Task, status: Status): void {
    task.status = status
}

function findTaskById(taskId: number, taskList: Task[]): Task | undefined {
    return taskList[taskList.findIndex(task => (task.taskId = taskId))]
}

export { addTask, displayTasks, deleteTask, assignTask, updateTaskStatus, findTaskById }
