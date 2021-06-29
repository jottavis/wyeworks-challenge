
const env = require('dotenv').config()
const fileHelper = require ('./helpers/file-helper')
const trello = require ('./trello/trello-app')


getDiscographyFromFile = function() {
    console.info("Loading discography file");
    fileHelper.processFile(function(err,discography){
        if(err){
            console.log(err);
            return;
        }
        trello.startTrelloApp(discography);
    });
}

getDiscographyFromFile();
