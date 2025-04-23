import { Command } from '../types'

import { addUser } from './users/addUser'
import { listUsers } from './users/listUsers'
import { deleteUser } from './users/deleteUser'

const commandList: Command = {
    'add user': addUser,
    'list users': listUsers,
    'delete user': deleteUser,
}

export { Command, commandList }
