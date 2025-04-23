export function updateAttribute<T, K extends keyof T>(object: T, attribute: K, value: T[K]) {
    object[attribute] = value
}

// Generators
export function generateID(list: any[]): number {
    return list.length > 0 ? list[list.length - 1].id + 1 : 1
}

// Input Validators
import { UserRole } from '../types'
export function isValidRole(input: string): boolean {
    if (!Object.values(UserRole).includes(input as UserRole)) {
        console.log(`Invalid Role. Please choose from: ${Object.values(UserRole).join('/')}`)
        return false
    }
    return true
}

import { TaskStatus } from '../types'
export function isValidStatus(input: string): boolean {
    if (!Object.values(TaskStatus).includes(input as TaskStatus)) {
        console.log(`Invalid Status. Please choose from: ${Object.values(TaskStatus).join('/')}`)
        return false
    }
    return true
}

import { users } from '../database/users'
export function isValidName(input: string): boolean {
    // Check for Starting with Number
    if (!isNaN(Number(input[0]))) {
        console.log('Name cannot start with a number.')
        return false
    }
    // Check for Existing Name
    const existingUser = users.find(user => user.name === input)
    if (existingUser) {
        console.log('Name already taken, Please choose another.')
        return false
    }
    return true
}

export function isValidId(input: string, list: any[]) {
    const indexFound = list.findIndex(element => element.id === Number(input))

    if (indexFound === -1) {
        console.log('Invalid ID. ID not found.')
        return false
    }
    return true
}

export function isYesOrNo(input: string) {
    const allowedInputs: string[] = ['y', 'yes', 'n', 'no']

    if (!allowedInputs.includes(input.toLowerCase())) {
        console.log('Invalid Input. Choose y or n only.')
        return false
    }
    return true
}

export function isEmpty(input: string): boolean {
    if (!input || input.trim() === '') {
        console.log('Input cannot be empty.')
        return true
    }
    return false
}

export function isExiting(input: string): boolean {
    if (input === 'exit') {
        console.log('Exiting current process...')
        return true
    }
    return false
}

export function isNumber(input: string): boolean {
    if (isNaN(Number(input))) {
        console.log('Please enter a number')
        return false
    }
    return true
}

export function cleanInput(input: string): string {
    return input.trim().toLowerCase()
}
