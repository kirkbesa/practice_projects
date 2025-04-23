import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function askQuestion(question: string): Promise<string> {
    return new Promise(answer => rl.question(question, answer))
}

interface User {
    id: number
    name: string
    role: string
}

enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager',
}

let users: User[] = []

async function addUser(): Promise<void> {
    type Step = 'askName' | 'askRole' | 'done'
    let step: Step = 'askName'
    let newUser: User
    try {
        const userId = users[users.length - 1].id + 1
        newUser = { id: userId, name: '', role: '' }
    } catch (error) {
        const userId = 1
        newUser = { id: userId, name: '', role: '' }
    }

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

    users.push(newUser) // Add the new user to the users array
    console.log('User added successfully!')
}

async function listUsers(): Promise<void> {
    if (users.length === 0) {
        console.log('No users found.')
    } else {
        console.log('List of users:')
        users.forEach(user => {
            console.log(`Id: ${user.id}, Name: ${user.name}, Role: ${user.role}`)
        })
    }
}

interface Command {
    [key: string]: () => Promise<void>
}

const commands: Command = {
    'add user': addUser,
    'list users': listUsers,
}

function printHelp(): void {
    console.log('Available commands:')
    Object.keys(commands).forEach(command => {
        console.log(`- ${command}`)
    })
    console.log('- exit')
}

async function startApp() {
    console.log('Weclome to TaskManager CLI!')

    let running = true

    while (running) {
        console.log('Type "help" for a list of commands.')
        const input: string = await askQuestion('Type a command: ')
        const commandInput: string = input.toLowerCase()
        const action = commands[commandInput]

        switch (commandInput) {
            case 'help':
                printHelp()
                break
            case 'exit':
                running = false
                console.log('Goodbye!')
                break
            default:
                if (action) {
                    await action()
                } else {
                    console.log('Invalid command. Type "help" for a list of commands.')
                }
                break
        }
    }

    rl.close()
}

startApp()
