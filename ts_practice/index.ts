// ---------- Variables ----------
// Any Types
let anyType: any
anyType = 5
anyType = 'Hello World!'
anyType = true
anyType = null

// Implicit Types
let id: number = 5
let firstName: string = 'John'
let isActive: boolean = true
let lastName: string | null = null
let age: number | string = 25

// ---------- Arrays ----------
let ids: number[] = [1, 2, 3, 4, 5]
let names: string[] = ['John', 'Jane', 'Doe']
let isActiveArray: boolean[] = [true, false, true]

let anyArray: any[] = [1, 'Hello', true, null, undefined] // Array of any type
let mixedArray: (number | string)[] = [1, 'Hello', 2, 'World'] // Array of mixed types
let tuple: [number, string] = [1, 'Hello'] // Tuple with fixed types

// ---------- Functions ----------
const concatenateStrings = (string1: string, string2: string): string => {
    // Type annotation for function parameters and return type
    return string1 + string2
}

// ---------- Objects ----------
interface Post {
    post_id: number
    title: string
    content: string
}

interface User {
    id: number
    name: string
    age?: number
    isActive?: boolean // ? = Optional property
    posts?: Post[] // Type is Post[] (Custom Type)
    greeting?(message: string): void // Method with optional parameter and return type
    [key: string]: any // Index signature for additional properties (string)
}

const kirk: User = {
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
    greeting(message: string) {
        console.log(message)
    },
}
// kirk.greeting(`Hello i am ${kirk.name}!`);

// ---------- Custom Types ----------
type UserInput = string | number | boolean | null | undefined
type UserProfile = User | null
type UserPosts = Post[] | null // Union type (Post[] or null)
type DarkModeSetting = boolean | 'auto' // Union type (boolean or 'auto')

type UserWithPosts = User & Post // Intersection type (User and Post)

const kirksPost: UserWithPosts = {
    id: 1,
    name: 'Kirk',
    title: 'Hello World',
    content: 'This is my first post',
    post_id: 1,
}
// console.log(`Name: ` + kirksPost.name + ` Post: ` + kirksPost.title + ` Content: ` + kirksPost.content);

// ---------- Enums ----------
const userFromDB = { id: 1, name: 'Alice', role: 'admin' }

enum UserRole { // Enums interpret raw constant data ex. data from DB
    Admin = 'admin',
    User = 'user',
    Guest = 'guest',
}

function getDashboard(role: string) {
    if (role === UserRole.Admin) {
        console.log('Redirect to Admin Dashboard')
    } else if (role === UserRole.User) {
        console.log('Redirect to User Home')
    } else if (role === UserRole.Guest) {
        console.log('Redirect to Guest Page')
    } else {
        console.log('Unknown role, access denied.')
    }
}

getDashboard(userFromDB.role)

// Role-Based Dashboards (Admin, Editor, Viewer)
// User Subscription Tiers (Free, Premium, Enterprise)
// Order Status Views (Pending, Shipped, Delivered)
// Theme Modes (Light, Dark, Auto)
// Multi-Step Forms (Step1, Step2, Completed)

// ---------- Generics ----------
class StorageContainer<T> {
    private contents: T[]

    constructor() {
        this.contents = []
    }

    getAllItems(): T[] {
        return this.contents
    }

    getItem(index: number): T | undefined {
        return this.contents[index]
    }

    addItem(item: T): void {
        this.contents.push(item)
    }

    removeItem(): T | undefined {
        return this.contents.pop()
    }
}

// const usernames = new StorageContainer<string>();
// usernames.addItem('John');
// usernames.addItem('Kirk');

// console.log(usernames.getAllItems());
// console.log(usernames.getItem(0));
// console.log(usernames.removeItem());
// console.log(usernames.getAllItems());

interface Employee {
    readonly employeeId: number // Readonly property, cannot be changed after initialization
    readonly startDate: Date
    name: string
    department: string
}

const sampleEmployee: Employee = {
    employeeId: 1,
    startDate: new Date(),
    name: 'John Doe',
    department: 'Engineering',
}

// ---------- Getting the Type of a Variable ----------
const WeatherAPIResult = {
    temperature: 25,
    humidity: 60,
    windSpeed: 10,
    condition: 'Sunny',
}

type WeatherData = typeof WeatherAPIResult // Creates an object with the same structure as WeatherAPIResult
type WeatherDataKeys = keyof typeof WeatherAPIResult // Creates a union of the keys of WeatherAPIResult (temperature | humidity | windSpeed | condition)

// ---------- Getting the Returned Type of a Function ----------
const func = () => {
    const val = 123
    return val
}

type ReturnedType = ReturnType<typeof func> // Creates a type based on the return type of func (number)

// for Async functions, the returned type is a Promise
const async_func = async () => {
    const val = 'promised value'
    return val
}

type ReturnedTypeAsync = ReturnType<typeof async_func> // Promise<string>
type AwaitedType = Awaited<ReturnType<typeof async_func>> // string

// ---------- Nested Types ----------
interface MainType {
    id: number
    name: string
    age: number
}

// interface SecondaryType extends MainType {           // Inheritance, more semantic than type &
//     isDeveloper: boolean;                            // Object shapes and modeling entities
// }

type SecondaryType = MainType & {
    isDeveloper: boolean
}

type TertiaryType = SecondaryType & {
    isActive: boolean
}

type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

type whatIsThisType = Prettify<TertiaryType>

// ---------- Partials and Requireds ----------
interface Todo {
    title?: string
    description: string
    createdAt?: Date
    updatedAt?: Date
}

const updateTodoAttribute = (todo: Todo, fieldsToUpdate: Partial<Todo>) => {
    // Partial makes all properties optional (even if they are required)
    return { ...todo, fieldsToUpdate }
}

const updateTodoAllAttributes = (todo: Todo, fieldsToUpdate: Required<Todo>) => {
    // Required makes all properties required (even if they are optional)
    return { ...todo, fieldsToUpdate }
}

const initialTodo: Todo = {
    title: 'Learn TypeScript',
    description: 'Study the basics of TypeScript',
}

let updatedTodo: Todo = updateTodoAttribute(initialTodo, {
    description: 'Learn TypeScript and React', // description is optional in the original Todo type
})

updatedTodo = updateTodoAllAttributes(initialTodo, {
    title: 'Learn TypeScript and React', // title is required in the original Todo type
    description: 'Learn TypeScript and React', // description is optional in the original Todo type
    createdAt: new Date(), // createdAt is optional in the original Todo type
    updatedAt: new Date(), // updatedAt is optional in the original Todo type
})

// ---------- Omits and Excludes ----------
type OmittedTodo = Omit<Todo, 'createdAt' | 'updatedAt'> // Omit removes the specified properties from the Todo type

type Shapes =
    | {
          kind: 'circle'
          radius: number
      }
    | {
          kind: 'square'
          sideLength: number
      }

type Circle = Exclude<Shapes, { kind: 'square' }> // Exclude removes the square shape from the union
