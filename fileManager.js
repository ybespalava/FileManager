const readline = require('readline');
const {
    printEOL, printCPUsInfo, printHomeDir, printUsername, printArchitecture,
    copyFile, moveFile, deleteFile, renameFile, calculateFileHash
} = require('./basicOperations');
const { printCurrentPath, listFilesAndFolders, changeDirectory, goUp } = require('./navigation');
const { compressFile, decompressFile } = require('./compression'); // Importing the new module

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'FileManager> '
});

// Parsing command-line arguments
const args = process.argv.slice(2);
const parsedArgs = {};
args.forEach(arg => {
    if (arg.startsWith('--')) {
        const [key, value] = arg.substring(2).split('=');
        parsedArgs[key] = value || true;
    }
});

// Handling username input from the command line
const username = parsedArgs.username;

if (!username) {
    console.error('Please provide a username using the syntax: npm run start -- --username=your_username');
    process.exit(1); // Exit the program if username is missing
}

function printWelcomeMessage() {
    console.log(`Welcome to the File Manager, ${username}!`);
}

function printGoodbyeMessage() {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

rl.on('line', (input) => {
    const [command, ...args] = input.trim().split(' ');

    switch (command) {
        case 'up':
            goUp();
            break;

        case 'ls':
            listFilesAndFolders();
            break;

        case 'cd':
            changeDirectory(args[0]);
            break;

        case 'cp':
            copyFile(`${currentPath}/${args[0]}`, `${currentPath}/${args[1]}`);
            break;

        case 'mv':
            moveFile(`${currentPath}/${args[0]}`, `${currentPath}/${args[1]}`);
            break;

        case 'rm':
            deleteFile(`${currentPath}/${args[0]}`);
            break;

        case 'rn':
            renameFile(`${currentPath}/${args[0]}`, `${currentPath}/${args[1]}`);
            break;

        case 'compress':
            compressFile(`${currentPath}/${args[0]}`, `${currentPath}/${args[1]}`);
            break;

        case 'decompress':
            decompressFile(`${currentPath}/${args[0]}`, `${currentPath}/${args[1]}`);
            break;

        case 'hash':
            calculateFileHash(`${currentPath}/${args[0]}`);
            break;

        case '--EOL':
            printEOL();
            break;

        case '--cpus':
            printCPUsInfo();
            break;

        case '--homedir':
            printHomeDir();
            break;

        case '--username':
            printUsername();
            break;

        case '--architecture':
            printArchitecture();
            break;

        case '.exit':
            printGoodbyeMessage();
            process.exit(0);
            break;

        default:
            console.log('Invalid input. Please enter a valid command.');
            break;
    }

    rl.prompt();
});

// Welcome message and initial prompt
printWelcomeMessage();
printCurrentPath();
rl.prompt();
