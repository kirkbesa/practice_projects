export function updateAttribute<T, K extends keyof T>(object: T, attribute: K, value: T[K]) {
    object[attribute] = value
}

import { UserRole } from '../types'
export function isValidRole(input: string): boolean {
    if (!Object.values(UserRole).includes(input as UserRole)) {
        console.log(`Invalid Role. Please choose from: ${Object.values(UserRole).join('/')}`)
        return false
    }
    return true
}

import { users } from '../database/users'
import { truncate } from 'lodash'
export function isValidName(input: string): boolean {
    // Check for Starting with Space
    if (input[0] === ' ') {
        console.log('Name cannot start with a space.')
        return false
    }
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

export function isEmpty(input: string): boolean {
    // Check for Empty
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
