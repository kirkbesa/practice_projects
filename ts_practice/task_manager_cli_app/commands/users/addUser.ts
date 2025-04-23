import { askQuestion } from '../../utils/readline'
import { users } from '../../database/users'
import { UserRole } from '../../types'

export async function addUser(): Promise<void> {
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
                const name: string = await askQuestion('Enter name: ')

                if (!name) {
                    console.log('Name cannot be empty.')
                    continue
                } else if (name[0] === ' ') {
                    console.log('Name cannot start with a space.')
                    continue
                } else if (!isNaN(Number(name[0]))) {
                    console.log('Name cannot start with a number.')
                    continue
                } else {
                    const existingUser = users.find(user => user.name === name)
                    if (existingUser) {
                        console.log('Name already taken, Please choose another.')
                        continue
                    }
                }

                newUser.name = name
                step = 'askRole'
                break

            case 'askRole':
                const rolesString = Object.values(UserRole).join('/') // Dynamically Fetch Roles from UserRole enum
                const role: string = await askQuestion(`Enter role (${rolesString}): `)

                if (!role) {
                    console.log('Role cannot be empty.')
                    continue
                } else if (!Object.values(UserRole).includes(role as UserRole)) {
                    console.log(`Invalid role. Choose from: ${rolesString}`)
                    continue
                }

                newUser.role = role
                step = 'done'
                break
        }
    }

    users.push(newUser) // Add the new user to the users array
    console.log(`User: ${newUser.name} added successfully!`)
}
