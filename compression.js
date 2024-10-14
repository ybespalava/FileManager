const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// Compress a file using Brotli
function compressFile(sourcePath, destinationPath) {
    const sourceFullPath = path.resolve(sourcePath);
    const destinationFullPath = `${destinationPath}.br`; // Add .br extension for Brotli

    if (fs.existsSync(sourceFullPath) && fs.statSync(sourceFullPath).isFile()) {
        const readStream = fs.createReadStream(sourceFullPath);
        const writeStream = fs.createWriteStream(destinationFullPath);
        const brotliStream = zlib.createBrotliCompress();

        readStream.pipe(brotliStream).pipe(writeStream);

        writeStream.on('finish', () => {
            console.log(`File compressed: ${sourcePath} -> ${destinationFullPath}`);
        });

        writeStream.on('error', (err) => {
            console.log('Error compressing file:', err.message);
        });
    } else {
        console.log('Invalid source file path or file does not exist.');
    }
}

// Decompress a Brotli file
function decompressFile(sourcePath, destinationPath) {
    const sourceFullPath = path.resolve(sourcePath);
    const destinationFullPath = path.resolve(destinationPath);

    if (fs.existsSync(sourceFullPath) && fs.statSync(sourceFullPath).isFile()) {
        const readStream = fs.createReadStream(sourceFullPath);
        const writeStream = fs.createWriteStream(destinationFullPath);
        const brotliStream = zlib.createBrotliDecompress();

        readStream.pipe(brotliStream).pipe(writeStream);

        writeStream.on('finish', () => {
            console.log(`File decompressed: ${sourcePath} -> ${destinationFullPath}`);
        });

        writeStream.on('error', (err) => {
            console.log('Error decompressing file:', err.message);
        });
    } else {
        console.log('Invalid source file path or file does not exist.');
    }
}

// Export the compression functions
module.exports = {
    compressFile,
    decompressFile,
};
