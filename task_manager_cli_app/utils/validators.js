"use strict";
function isIdExisting(input, list) {
    const existingElement = list.findIndex(element => element.id === Number(input));
    if (existingElement === -1) {
        return { valid: false, message: 'Invalid ID. ID not found' };
    }
    return { valid: true, message: '' };
}
