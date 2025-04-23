import { askQuestion } from '../../utils/readline'
import { users } from '../../database/users'
import { User, UserRole } from '../../types'
import { isValidName, isValidRole, isEmpty, isExiting } from '../../utils/helpers'

export async function addUser(): Promise<void> {
    console.log('Type "exit" at any time to cancel user creation.')

    // User ID generation logic
    // If user list is not empty, add 1 to last id, else set to 1
    const userId = users.length > 0 ? users[users.length - 1].id + 1 : 1
    let newUser: User = { id: userId, name: '', role: '' }

    // User Input Loop
    // Ask for Name
    while (true) {
        const nameInput: string = await askQuestion('Enter name: ')

        // Check for Exit
        if (isExiting(nameInput)) {
            return
        }
        if (isEmpty(nameInput)) {
            continue
        }
        // Check for Valid Name - starts with number/space, is existing
        if (!isValidName(nameInput)) {
            continue
        }

        newUser.name = nameInput // Assign Name
        break
    }

    // Ask for Role
    const rolesString = Object.values(UserRole).join('/') // Dynamically Fetch Roles from UserRole enum

    while (true) {
        const roleInput: string = await askQuestion(`Enter role (${rolesString}): `)

        // Check for Exit
        if (isExiting(roleInput)) {
            return
        }
        // Check for Empty
        if (isEmpty(roleInput)) {
            continue
        }
        // Check for Valid Role
        if (!isValidRole(roleInput)) {
            continue
        }

        newUser.role = roleInput // Assign Role
        users.push(newUser) // Add New User
        console.log(`User: ${newUser.name} added successfully!`)
        return
    }
}
