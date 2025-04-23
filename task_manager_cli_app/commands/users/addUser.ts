import { askQuestion } from '../../utils/readline'
import { users } from '../../database/users'
import { User, UserRole } from '../../types'

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
        if (nameInput === 'exit') {
            console.log('Exiting user creation...')
            return
        }
        // Check for Empty
        if (!nameInput) {
            console.log('Name cannot be empty.')
            continue
        }
        // Check for Starting with Space
        if (nameInput[0] === ' ') {
            console.log('Name cannot start with a space.')
            continue
        }
        // Check for Starting with Number
        if (!isNaN(Number(nameInput[0]))) {
            console.log('Name cannot start with a number.')
            continue
        }
        // Check for Existing Name
        const existingUser = users.find(user => user.name === nameInput)
        if (existingUser) {
            console.log('Name already taken, Please choose another.')
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
        if (roleInput === 'exit') {
            console.log('Exiting user creation...')
            return
        }
        // Check for Empty
        if (!roleInput) {
            console.log('Role cannot be empty.')
            continue
        }
        // Check for Valid Role
        if (!Object.values(UserRole).includes(roleInput as UserRole)) {
            console.log(`Invalid role. Choose from: ${rolesString}`)
            continue
        }
        newUser.role = roleInput // Assign Role
        users.push(newUser) // Add New User
        console.log(`User: ${newUser.name} added successfully!`)
        return
    }
}
