import { askQuestion } from '../../utils/readline'
import { users } from '../../database/users'
import { User, UserRole } from '../../types'
import {
    isValidName,
    isValidRole,
    isEmpty,
    isExiting,
    cleanInput,
    generateID,
} from '../../utils/helpers'

export async function addUser(): Promise<void> {
    console.log('Type "exit" at any time to cancel user creation.')

    // User ID generation logic
    const userId = generateID(users)
    let newUser: User = { id: userId, name: '', role: '' }

    // User Input Loop
    // Ask for Name
    while (true) {
        let nameInput: string = await askQuestion('Enter name: ')
        nameInput = nameInput.trim()

        // Check for Exit
        if (isExiting(nameInput)) return
        if (isEmpty(nameInput)) continue
        // Check for Valid Name - starts with number/space, is existing
        if (!isValidName(nameInput)) continue

        newUser.name = nameInput // Assign Name
        break
    }

    // Ask for Role
    const rolesString = Object.values(UserRole).join('/') // Dynamically Fetch Roles from UserRole enum

    while (true) {
        let roleInput: string = await askQuestion(`Enter role (${rolesString}): `)
        roleInput = cleanInput(roleInput)

        // Check for Exit
        if (isExiting(roleInput)) return
        // Check for Empty
        if (isEmpty(roleInput)) continue
        // Check for Valid Role
        if (!isValidRole(roleInput)) continue

        newUser.role = roleInput // Assign Role
        users.push(newUser) // Add New User
        console.log(`User: ${newUser.name} added successfully!`)
        return
    }
}
