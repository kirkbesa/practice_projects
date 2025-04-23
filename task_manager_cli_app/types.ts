// Commands
interface Command {
    [key: string]: () => Promise<void> // ex. ('add user': addUser)
}

// Users
type Role = 'admin' | 'user' | 'manager' | string
interface User {
    id: number
    name: string
    role: Role
}

enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager',
}

// Tasks
type Status = 'unassigned' | 'assigned' | 'in progress' | 'done' | 'cancelled'

interface Task {
    taskId: number
    title: string
    assignedTo: number | undefined
    status: Status
}

enum TaskStatus {
    UNASSIGNED = 'unnassigned',
    ASSIGNED = 'assigned',
    INPROGRESS = 'in progress',
    DONE = 'done',
    CANCELLED = 'cancelled',
}

export { Command, User, UserRole, Role, Task, Status, TaskStatus }
