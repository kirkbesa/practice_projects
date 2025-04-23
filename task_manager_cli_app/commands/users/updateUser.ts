import { askQuestion } from '../../utils/readline'
import { isValidRole, updateAttribute } from '../../utils/helpers'
import { listUsers } from './listUsers'
import { users } from '../../database/users'
import { User, UserRole } from '../../types'

export async function updateUser(): Promise<void> {
    if (users.length === 0) {
        listUsers()
        return
    }
    console.log('Type "exit" at any time to cancel user update.')
    let userToUpdateIndex: number = -1

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
        userToUpdateIndex = users.findIndex(user => user.id === userIdInputNumber)
        if (userToUpdateIndex === -1) {
            console.log('Invalid user ID. User not found.')
            continue
        }
        break
    }

    // Ask what to update
    while (true) {
        const userToUpdateObject: User = users[userToUpdateIndex]
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
        // Check for all
        if (attributeInput === 'all') {
            for (const attribute of updatableAttributes) {
                while (true) {
                    let newInput: string = await askQuestion(`Type new value for ${attribute}: `)

                    // Check for Empty
                    if (!newInput) {
                        console.log(`${attribute} cannot be empty.`)
                        continue
                    }

                    newInput = newInput.trim().toLowerCase()

                    // Check for valid role
                    if (attribute === 'role') {
                        const rolesString = Object.values(UserRole).join('/')
                        if (!isValidRole(newInput)) {
                            console.log(`Invalid Role. Please choose from: ${rolesString}`)
                            continue
                        }
                    }

                    updateAttribute(userToUpdateObject, attribute as keyof User, newInput)
                    break
                }
            }
            console.log('All attributes updated successfully.')
            return
        }
        // Check for invalid attribute
        if (!updatableAttributes.includes(attributeInput.trim())) {
            console.log('Invalid attribute.')
            continue
        }
    }
}
