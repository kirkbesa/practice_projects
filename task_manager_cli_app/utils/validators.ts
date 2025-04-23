type Result = { valid: boolean; message: string }

function isIdExisting(input: string, list: any[]): Result {
    const existingElement = list.findIndex(element => element.id === Number(input))
    if (existingElement === -1) {
        return { valid: false, message: 'Invalid ID. ID not found' }
    }
    return { valid: true, message: '' }
}
