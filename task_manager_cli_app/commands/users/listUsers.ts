import { users } from '../../database/users'

export async function listUsers(): Promise<void> {
    if (users.length === 0) {
        console.log('No users found.')
    } else {
        console.log('List of users:')
        users.forEach(user => {
            console.log(`Id: ${user.id}, Name: ${user.name}, Role: ${user.role}`)
        })
    }
}
