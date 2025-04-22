"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ---------- Variables ----------
// Any Types
let anyType;
anyType = 5;
anyType = 'Hello World!';
anyType = true;
anyType = null;
// Implicit Types
let id = 5;
let firstName = 'John';
let isActive = true;
let lastName = null;
let age = 25;
// ---------- Arrays ----------
let ids = [1, 2, 3, 4, 5];
let names = ['John', 'Jane', 'Doe'];
let isActiveArray = [true, false, true];
let anyArray = [1, 'Hello', true, null, undefined]; // Array of any type
let mixedArray = [1, 'Hello', 2, 'World']; // Array of mixed types
let tuple = [1, 'Hello']; // Tuple with fixed types
// ---------- Functions ----------
const concatenateStrings = (string1, string2) => {
    // Type annotation for function parameters and return type
    return string1 + string2;
};
const kirk = {
    id: 1,
    name: 'Kirk',
    isActive: true,
    posts: [
        {
            post_id: 1,
            title: 'Hello World',
            content: 'This is my first post',
        },
    ],
    greeting(message) {
        console.log(message);
    },
};
const kirksPost = {
    id: 1,
    name: 'Kirk',
    title: 'Hello World',
    content: 'This is my first post',
    post_id: 1,
};
// console.log(`Name: ` + kirksPost.name + ` Post: ` + kirksPost.title + ` Content: ` + kirksPost.content);
// ---------- Enums ----------
const userFromDB = { id: 1, name: 'Alice', role: 'admin' };
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
    UserRole["User"] = "user";
    UserRole["Guest"] = "guest";
})(UserRole || (UserRole = {}));
function getDashboard(role) {
    if (role === UserRole.Admin) {
        console.log('Redirect to Admin Dashboard');
    }
    else if (role === UserRole.User) {
        console.log('Redirect to User Home');
    }
    else if (role === UserRole.Guest) {
        console.log('Redirect to Guest Page');
    }
    else {
        console.log('Unknown role, access denied.');
    }
}
getDashboard(userFromDB.role);
// Role-Based Dashboards (Admin, Editor, Viewer)
// User Subscription Tiers (Free, Premium, Enterprise)
// Order Status Views (Pending, Shipped, Delivered)
// Theme Modes (Light, Dark, Auto)
// Multi-Step Forms (Step1, Step2, Completed)
// ---------- Generics ----------
class StorageContainer {
    constructor() {
        this.contents = [];
    }
    getAllItems() {
        return this.contents;
    }
    getItem(index) {
        return this.contents[index];
    }
    addItem(item) {
        this.contents.push(item);
    }
    removeItem() {
        return this.contents.pop();
    }
}
const sampleEmployee = {
    employeeId: 1,
    startDate: new Date(),
    name: 'John Doe',
    department: 'Engineering',
};
// ---------- Getting the Type of a Variable ----------
const WeatherAPIResult = {
    temperature: 25,
    humidity: 60,
    windSpeed: 10,
    condition: 'Sunny',
};
// ---------- Getting the Returned Type of a Function ----------
const func = () => {
    const val = 123;
    return val;
};
// for Async functions, the returned type is a Promise
const async_func = () => __awaiter(void 0, void 0, void 0, function* () {
    const val = 'promised value';
    return val;
});
const updateTodoAttribute = (todo, fieldsToUpdate) => {
    // Partial makes all properties optional (even if they are required)
    return Object.assign(Object.assign({}, todo), { fieldsToUpdate });
};
const updateTodoAllAttributes = (todo, fieldsToUpdate) => {
    // Required makes all properties required (even if they are optional)
    return Object.assign(Object.assign({}, todo), { fieldsToUpdate });
};
const initialTodo = {
    title: 'Learn TypeScript',
    description: 'Study the basics of TypeScript',
};
let updatedTodo = updateTodoAttribute(initialTodo, {
    description: 'Learn TypeScript and React', // description is optional in the original Todo type
});
updatedTodo = updateTodoAllAttributes(initialTodo, {
    title: 'Learn TypeScript and React', // title is required in the original Todo type
    description: 'Learn TypeScript and React', // description is optional in the original Todo type
    createdAt: new Date(), // createdAt is optional in the original Todo type
    updatedAt: new Date(), // updatedAt is optional in the original Todo type
});
