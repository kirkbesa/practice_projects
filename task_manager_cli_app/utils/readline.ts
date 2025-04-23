import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function askQuestion(question: string): Promise<string> {
    return new Promise(answer => rl.question(question, answer))
}

function closeReadline() {
    rl.close()
}

export { askQuestion, closeReadline }
