import { askQuestion } from '../../utils/readline'
import { Task } from '../../types'
import { addTask } from './taskFunctions'
import {
    isEmpty,
    generateID,
    isExiting,
    isNumber,
    isValidId,
    cleanInput,
} from '../../utils/helpers'
import { tasks } from '../../database/tasks'
import { users } from '../../database/users'
import { listUsers } from '../users/listUsers'

export async function createTask(): Promise<void> {
    console.log('Type "exit" at any time to cancel task creation.')

    // Task ID generation logic
    const taskId = generateID(tasks)
    let newTask: Task = {
        taskId: taskId,
        title: '',
        assignedTo: undefined,
        status: 'unassigned',
    }

    // User Input Loop
    // Ask for Title
    while (true) {
        let taskTitleInput: string = await askQuestion('Enter Task Title: ')

        // Validation
        taskTitleInput = taskTitleInput.trim()
        if (isExiting(taskTitleInput)) return
        if (isEmpty(taskTitleInput)) continue

        newTask.title = taskTitleInput
        break
    }

    // Ask for who to assign to
    while (true) {
        listUsers()
        console.log('Type "none" to assign to no one yet')
        let assignToInput: string = await askQuestion('Assign to User ID: ')

        // Validation
        assignToInput = cleanInput(assignToInput)
        if (isExiting(assignToInput)) return
        if (isEmpty(assignToInput)) {
            continue
        } else {
            if (assignToInput === 'none') {
                newTask.assignedTo = undefined
            } else {
                if (!isNumber(assignToInput)) continue
                if (!isValidId(assignToInput, users)) continue
            }
        }

        newTask.assignedTo = Number(assignToInput)

        // Set Status
        if (newTask.assignedTo === undefined) {
            newTask.status = 'unassigned'
        } else {
            newTask.status = 'assigned'
        }
        break
    }

    addTask(newTask, tasks)
    return
}
