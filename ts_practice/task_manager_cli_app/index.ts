import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function askQuestion(question: string): Promise<string> {
    return new Promise(answer => rl.question(question, answer))
}

async function startApp() {
    console.log('Weclome to TaskManager CLI!')

    let running = true

    while (running) {
        const input = await askQuestion('Type a command: ')
        switch (input.toLowerCase()) {
            case 'help':
                console.log('List of commands:')
                break
            case 'exit':
                running = false
                console.log('Goodbye!')
                break
            default:
                console.log('Unknown command.')
        }
    }

    rl.close()
}

startApp()
