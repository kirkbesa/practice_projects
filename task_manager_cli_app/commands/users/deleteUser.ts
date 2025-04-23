import { askQuestion } from '../../utils/readline'
import { users } from '../../database/users'
import { listUsers } from './listUsers'
import { isExiting, isEmpty, isNumber, isValidId, isYesOrNo, cleanInput } from '../../utils/helpers'

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
        if (isExiting(userIdInput)) {
            return
        }
        // Check for Empty
        if (isEmpty(userIdInput)) {
            continue
        }
        // Check for Number
        if (!isNumber(userIdInput)) {
            continue
        }
        // Check for Existing Valid User ID
        if (!isValidId(userIdInput, users)) {
            continue
        }
        userToDelete = Number(userIdInput) - 1
        console.log(userToDelete)
        console.log(users[userToDelete])
        break
    }

    // Confirm Deletion
    while (true) {
        let confirmDeleteInput: string = await askQuestion(
            `Are you sure you want to delete ${users[userToDelete].name} - ${users[userToDelete].role}? (y/n): `
        )
        confirmDeleteInput = cleanInput(confirmDeleteInput)

        // Check for Exit
        if (isExiting(confirmDeleteInput)) {
            return
        }
        // Check for Empty
        if (isEmpty(confirmDeleteInput)) {
            continue
        }
        // Check for y/n
        if (!isYesOrNo(confirmDeleteInput)) {
            continue
        } else {
            if (confirmDeleteInput === 'y' || confirmDeleteInput === 'yes') {
                users.splice(userToDelete, 1) // Delete User
                console.log('User deleted successfully.')
                return
            }
            if (confirmDeleteInput === 'n' || confirmDeleteInput === 'no') {
                console.log('User deletion cancelled. Returning to main menu...')
                return
            }
        }
    }
}
