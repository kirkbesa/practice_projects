import { askQuestion } from '../../utils/readline'
import { users } from '../../database/users'
import { listUsers } from './listUsers'

export async function deleteUser(): Promise<void> {
    if (users.length === 0) {
        listUsers()
        return
    }
    console.log('Type "exit" at any time to cancel user deletion.')
    let userToDelete: number = -1

    // User Input Loop
    // Ask for ID
    while (true) {
        listUsers()
        const userIdInput: string = await askQuestion('Enter user ID to delete: ')

        // Check for Exit
        if (userIdInput === 'exit') {
            console.log('Exiting user deletion...')
            return
        }
        // Check for Empty
        if (!userIdInput) {
            console.log('User ID cannot be empty.')
            continue
        }
        // Check for Number
        const userIdInputNumber: number = Number(userIdInput)
        if (isNaN(userIdInputNumber)) {
            console.log('Invalid user ID. Please enter a number.')
            continue
        }
        // Check for Existing Valid User ID
        userToDelete = users.findIndex(user => user.id === userIdInputNumber)
        if (userToDelete === -1) {
            console.log('Invalid user ID. User not found.')
            continue
        }
        break
    }

    // Confirm Deletion
    while (true) {
        const confirmDeleteInput: string = await askQuestion(
            `Are you sure you want to delete ${users[userToDelete].name} - ${users[userToDelete].role}? (y/n): `
        )

        // Check for Exit
        if (confirmDeleteInput === 'exit') {
            console.log('Exiting user deletion...')
            return
        }
        // Check for Empty
        if (!confirmDeleteInput) {
            console.log('Confirmation cannot be empty.')
            continue
        }
        // Check for y/n
        if (confirmDeleteInput.toLowerCase() === 'y') {
            users.splice(userToDelete, 1) // Delete User
            console.log('User deleted successfully.')
            return
        } else if (confirmDeleteInput.toLowerCase() === 'n') {
            console.log('User deletion cancelled.')
            deleteUser() // Restart the process
        } else {
            console.log('Invalid input. Please enter "y" or "n".')
        }
    }
}
