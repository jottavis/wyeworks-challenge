

const TRELLO_BASE_URL = process.env.TRELLO_BASE_URL;
const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;


function buildCreateBoardUrl(boardName){
    let url = TRELLO_BASE_URL
    return url + '/boards/?' +
        [
        'key=' + TRELLO_KEY,
        'token=' + TRELLO_TOKEN,
        'name=' + boardName,
        'defaultLists=' + false,
        ].join('&')
}

function buildCreateListUrl(boardId,listName){
    let url = TRELLO_BASE_URL
    return url + '/boards/'+ boardId +'/lists?'+
        [
        'key=' + TRELLO_KEY,
        'token=' + TRELLO_TOKEN,
        'name=' + listName,
        ].join('&')
}

function buildCreateCardsUrl(listId,card){
    let url = TRELLO_BASE_URL;
    let cardName = card.year + ' - ' + card.name.replace(`’`,"")
    return url + '/cards?'+
        [
        'key=' + TRELLO_KEY,
        'token=' + TRELLO_TOKEN,
        'idList=' + listId,
        'name=' + cardName,
        ].join('&')
}

module.exports = {
    buildCreateBoardUrl : buildCreateBoardUrl,
    buildCreateListUrl : buildCreateListUrl,
    buildCreateCardsUrl : buildCreateCardsUrl
};