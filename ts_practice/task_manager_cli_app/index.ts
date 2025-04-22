import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function askQuestion(question: string): Promise<string> {
    return new Promise(answer => rl.question(question, answer))
}

interface User {
    name: string
    role: string
}

enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager',
}

let users: User[] = []

async function addUser() {
    type Step = 'askName' | 'askRole' | 'done'
    let step: Step = 'askName'
    let newUser: User = { name: '', role: '' }

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
                        console.log('User already exists.')
                        continue
                    }
                }

                newUser.name = name
                step = 'askRole'
                break

            case 'askRole':
                const role: string = await askQuestion('Enter role (admin/user/manager): ')

                if (!role) {
                    console.log('Role cannot be empty.')
                    continue
                } else if (!Object.values(UserRole).includes(role as UserRole)) {
                    console.log('Invalid role. Choose from admin, user, or manager.')
                    continue
                }

                newUser.role = role
                step = 'done'
                break
        }
    }

    users.push(newUser)
    console.log('User added successfully!')
}

async function listUsers() {
    if (users.length === 0) {
        console.log('No users found.')
    } else {
        console.log('List of users:')
        users.forEach(user => {
            console.log(`Name: ${user.name}, Role: ${user.role}`)
        })
    }
}

async function startApp() {
    console.log('Weclome to TaskManager CLI!')

    let running = true

    while (running) {
        const input = await askQuestion('Type a command: ')
        switch (input.toLowerCase()) {
            case 'list users':
                console.clear()
                await listUsers()
                break
            case 'add user':
                console.clear()
                await addUser()
                break
            case 'help':
                console.clear()
                console.log('List of commands:')
                break
            case 'exit':
                running = false
                console.log('Goodbye!')
                break
            default:
                console.log('Unknown command.')
        }
    }

    rl.close()
}

startApp()
