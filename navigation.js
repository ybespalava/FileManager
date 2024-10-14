const fs = require('fs');
const os = require('os');

let currentPath = os.homedir();

// Print current path
function printCurrentPath() {
    console.log(`You are currently in ${currentPath}`);
}

// List files and folders in the current directory
function listFilesAndFolders() {
    printCurrentPath();
    const items = fs.readdirSync(currentPath).sort();

    console.log('Index  |    Type    |   Name');
    console.log('------------------------------');

    items.forEach((item, index) => {
        const fullPath = `${currentPath}/${item}`;
        const type = fs.statSync(fullPath).isDirectory() ? 'Folder' : 'File';
        const formattedIndex = index.toString().padEnd(5);
        const formattedName = item.padEnd(25); // Adjust the padding as needed
        console.log(`${formattedIndex}  |  ${type.padEnd(10)}| ${formattedName}`);
    });
}

// Change directory to a new path
function changeDirectory(path) {
    const newPath = path.startsWith('/') ? path : `${currentPath}/${path}`;

    if (fs.existsSync(newPath) && fs.statSync(newPath).isDirectory()) {
        currentPath = newPath;
        printCurrentPath();
    } else {
        console.log('Invalid path or directory does not exist.');
    }
}

// Move up to the parent directory
function goUp() {
    const parentPath = currentPath.split('/').slice(0, -1).join('/');

    if (parentPath !== '') {
        currentPath = parentPath;
        printCurrentPath();
    } else {
        console.log('You are already in the root directory.');
    }
}

// Export all navigation functions
module.exports = {
    printCurrentPath,
    listFilesAndFolders,
    changeDirectory,
    goUp,
    currentPath,
};
