import { askQuestion } from '../../utils/readline'
import { listUsers } from './listUsers'
import { users } from '../../database/users'
import { User } from '../../types'

export async function updateUser(): Promise<void> {
    if (users.length === 0) {
        listUsers()
        return
    }
    console.log('Type "exit" at any time to cancel user update.')
    let userToUpdate: number = -1

    // Ask for ID
    while (true) {
        listUsers()
        const userIdInput: string = await askQuestion('Select User ID to update: ')

        // Check for exit
        if (userIdInput === 'exit') {
            console.log('Exiting user update...')
            return
        }
        // Check for Empty
        if (!userIdInput) {
            console.log('ID cannot be empty')
            continue
        }
        // Check for Number
        const userIdInputNumber: number = Number(userIdInput)
        if (isNaN(userIdInputNumber)) {
            console.log('Invalid user ID. Please enter a number.')
            continue
        }
        // Check for Existing Valid User ID
        userToUpdate = users.findIndex(user => user.id === userIdInputNumber)
        if (userToUpdate === -1) {
            console.log('Invalid user ID. User not found.')
            continue
        }
        break
    }

    // Ask what to update
    while (true) {
        const userToUpdateObject: User = users[userToUpdate]
        const updatableAttributes: string[] = Object.keys(userToUpdateObject).filter(
            key => key !== 'id'
        )
        const attributeInput: string = await askQuestion(
            `Select attribute to update: ${updatableAttributes.join('/')}/all `
        )

        // Check for exit
        if (attributeInput === 'exit') {
            console.log('Exiting user update...')
            return
        }
        // Check for both
    }
}
