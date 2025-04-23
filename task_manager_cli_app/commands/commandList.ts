import { Command } from '../types'

import { addUser } from './users/addUser'
import { listUsers } from './users/listUsers'
import { deleteUser } from './users/deleteUser'
import { updateUser } from './users/updateUser'
import { createTask } from './tasks/createTask'

const commandList: Command = {
    'add user': addUser,
    'list users': listUsers,
    'delete user': deleteUser,
    'update user': updateUser,
    'create task': createTask,
}

export { Command, commandList }
