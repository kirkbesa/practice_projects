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
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("./utils/readline");
const commandList_1 = require("./commands/commandList");
function printHelp() {
    console.log('Available commands:');
    Object.keys(commandList_1.commandList).forEach(command => {
        console.log(`- ${command}`);
    });
    console.log('- exit');
}
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Weclome to TaskManager CLI!');
        let running = true;
        while (running) {
            console.log('Type "help" for a list of commands.');
            const input = yield (0, readline_1.askQuestion)('Type a command: ');
            const commandInput = input.toLowerCase();
            const action = commandList_1.commandList[commandInput];
            switch (commandInput) {
                case 'help':
                    printHelp();
                    break;
                case 'exit':
                    running = false;
                    console.log('Goodbye!');
                    break;
                default:
                    if (action) {
                        yield action();
                    }
                    else {
                        console.log('Invalid command. Type "help" for a list of commands.');
                    }
                    break;
            }
        }
        (0, readline_1.closeReadline)();
    });
}
startApp();
