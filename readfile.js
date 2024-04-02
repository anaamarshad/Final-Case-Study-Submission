// Import the fs (File System) module
const fs = require('fs');

// Read the contents of a file
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
