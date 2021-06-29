const readline = require('readline');
const fs = require('fs')
const FILE = process.env.FILE_PATH


function processFile(cb){
    var discography=[];
    try{
        const file = readline.createInterface({
            input: fs.createReadStream(FILE),
            output: process.stdout,
            terminal: false
        });
        file.on('line', (line) => {
            let lineText = line.split(/ (.*)/);
            let album = {
                year: parseInt(lineText[0]),
                name: lineText[1]
            }
            discography.push(album);
        });
        file.on('pause', () => {
            return cb(null,discography);
          });
    }
    catch (e) {
        return cb(e,null);
    }
    
}

module.exports = {
    processFile: processFile,
};

