import { askQuestion } from '../../utils/readline'
import {
    isExiting,
    isEmpty,
    isNumber,
    isValidId,
    isValidRole,
    updateAttribute,
    isValidName,
    cleanInput,
} from '../../utils/helpers'
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
        if (isExiting(userIdInput)) return
        // Check if empty, if number, if existing id
        if (isEmpty(userIdInput) || !isNumber(userIdInput) || !isValidId(userIdInput, users))
            continue

        userToUpdateIndex = Number(userIdInput) - 1
        console.log(`Updating: ${users[userToUpdateIndex].name} - ${users[userToUpdateIndex].role}`)
        break
    }

    // Ask what to update
    while (true) {
        const userToUpdateObject: User = users[userToUpdateIndex]
        const updatableAttributes: string[] = Object.keys(userToUpdateObject).filter(
            key => key !== 'id'
        )
        let attributeInput: string = await askQuestion(
            `Select attribute to update (${updatableAttributes.join('/')}/all): `
        )
        attributeInput = cleanInput(attributeInput)

        // Check for Exit
        if (isExiting(attributeInput)) return
        // Check for Empty
        if (isEmpty(attributeInput)) continue

        // Check for All
        if (attributeInput === 'all') {
            for (const attribute of updatableAttributes) {
                while (true) {
                    let newInput: string = await askQuestion(`Type new value for ${attribute}: `)
                    newInput = cleanInput(newInput)

                    // Check for exit
                    if (isExiting(newInput)) return
                    // Check for Empty
                    if (isEmpty(newInput)) continue

                    if (attribute === 'name') {
                        if (!isValidName(newInput)) continue
                    }

                    // Check for valid role
                    if (attribute === 'role') {
                        if (!isValidRole(newInput)) continue
                    }

                    updateAttribute(userToUpdateObject, attribute as keyof User, newInput)
                    break
                }
            }
            console.log(
                `${userToUpdateObject.name} - ${userToUpdateObject.role} updated successfully.`
            )
            return
        }

        // Check for invalid attribute
        if (!updatableAttributes.includes(attributeInput)) {
            console.log('Invalid attribute.')
            continue
        }

        // Check for single attribute selection
        while (true) {
            let question: string
            if (attributeInput === 'role') {
                question = `Type new value for ${attributeInput} (${Object.values(UserRole).join(
                    '/'
                )}): `
            } else {
                question = `Type new value for ${attributeInput}: `
            }
            let newInput: string = await askQuestion(question)
            newInput = cleanInput(newInput)

            // Check for exit
            if (isExiting(newInput)) return
            // Check for Empty
            if (isEmpty(newInput)) continue

            if (attributeInput === 'name') {
                if (!isValidName(newInput)) continue
            }

            // Check for valid role
            if (attributeInput === 'role') {
                if (!isValidRole(newInput)) continue
            }

            updateAttribute(userToUpdateObject, attributeInput as keyof User, newInput)
            console.log(
                `${userToUpdateObject.name} - ${userToUpdateObject.role} updated successfully.`
            )
            return
        }
    }
}
