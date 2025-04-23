import { askQuestion } from '../../utils/readline'
import { users } from '../../database/users'
import { User, UserRole } from '../../types'

export async function addUser(): Promise<void> {
    console.log('Type "exit" at any time to cancel user creation.')
    let newUser: User

    // User ID generation logic
    try {
        // Increment the last user ID by 1
        const userId = users[users.length - 1].id + 1
        newUser = { id: userId, name: '', role: '' }
    } catch (error) {
        // Empty Case
        const userId = 1
        newUser = { id: userId, name: '', role: '' }
    }

    // User Input Loop
    type Step = 'askName' | 'askRole' | 'done'
    let step: Step = 'askName'

    while (step !== 'done') {
        switch (step) {
            case 'askName':
                const nameInput: string = await askQuestion('Enter name: ')

                if (nameInput === 'exit') {
                    console.log('Exiting user creation...')
                    step = 'done'
                    break
                } else if (!nameInput) {
                    console.log('Name cannot be empty.')
                    continue
                } else if (nameInput[0] === ' ') {
                    console.log('Name cannot start with a space.')
                    continue
                } else if (!isNaN(Number(nameInput[0]))) {
                    console.log('Name cannot start with a number.')
                    continue
                } else {
                    const existingUser = users.find(user => user.name === nameInput)
                    if (existingUser) {
                        console.log('Name already taken, Please choose another.')
                        continue
                    }
                }

                newUser.name = nameInput // Assign Name
                step = 'askRole'
                break

            case 'askRole':
                const rolesString = Object.values(UserRole).join('/') // Dynamically Fetch Roles from UserRole enum
                const roleInput: string = await askQuestion(`Enter role (${rolesString}): `)

                if (roleInput === 'exit') {
                    console.log('Exiting user creation...')
                    step = 'done'
                    break
                } else if (!roleInput) {
                    console.log('Role cannot be empty.')
                    continue
                } else if (!Object.values(UserRole).includes(roleInput as UserRole)) {
                    console.log(`Invalid role. Choose from: ${rolesString}`)
                    continue
                }

                newUser.role = roleInput // Assign Role
                users.push(newUser) // Add New User
                console.log(`User: ${newUser.name} added successfully!`)
                step = 'done'
                break
        }
    }
}
