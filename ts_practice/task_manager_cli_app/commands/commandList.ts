import { Command } from '../types'

import { addUser } from './users/addUser'
import { listUsers } from './users/listUsers'

const commandList: Command = {
    'add user': addUser,
    'list users': listUsers,
}

export { Command, commandList }
