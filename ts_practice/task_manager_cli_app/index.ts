import { askQuestion, closeReadline } from './utils/readline'
import { commandList } from './commands/commandList'

function printHelp(): void {
    console.log('Available commands:')
    Object.keys(commandList).forEach(command => {
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
        const action = commandList[commandInput]

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

    closeReadline()
}

startApp()
