// Commands
interface Command {
    [key: string]: () => Promise<void> // ex. ('add user': addUser)
}

// Users
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

export { Command, User, UserRole }
