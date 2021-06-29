const fetch = require('node-fetch');
const trelloHelper = require('../helpers/trello-helper');
const urlHelper = require ('../helpers/url-helper')

function startTrelloApp(discography){
  console.info("Starting Trello App")
  createTrelloBoard(discography);
}

function createTrelloBoard  (discography){
    console.info('Creating Trello Board');
    fetch(urlHelper.buildCreateBoardUrl(`Bob Dylan's Discography`), {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          return response.json();
        })
        .then(board => createTrelloBoardLists(board.id,discography))
        .catch(err => console.error(err));
}

function listsRequest(boardId,decade) {
  return new Promise(resolve => {
    fetch(urlHelper.buildCreateListUrl(boardId,decade), {
      method: 'POST'
    })
    .then(response => {
      return response.json();
    })
    .then(list => {
      resolve(list.id);
    })
    .catch(err => console.log(err));
  });
}

async function createTrelloBoardLists(boardId,discography) {
  let lists = trelloHelper.buildListsArray(discography);
  console.info("Adding Lists to Board")
  let aux = lists.length-1;
  while(aux >= 0){
    let listName = trelloHelper.getListName(lists[aux].decade);
    await listsRequest(boardId,`${listName}'s`)
    .then(function(listId){
      lists[aux].id = listId;
      aux--;
    })
  }
  console.info("Building Trello Cards")
  createTrelloCards(lists,discography);
}


function cardRequest(listId,cardName) {
  return new Promise(resolve => {
    fetch(urlHelper.buildCreateCardsUrl(listId,cardName), {
      method: 'POST'
    })
    .then(response => {
      return response.json();
    })
    .then(card => {resolve(card)})
    .catch(err => console.log(err));
  });
}

async function createTrelloCards(lists,discography){
  console.info("Adding Cards to List")
  trelloHelper.sortDiscography(discography);
  let aux = 0;
  while(aux < discography.length){
    let list = trelloHelper.getListByDecade(lists,trelloHelper.getDecade(discography[aux].year));
    await cardRequest(list,discography[aux])
    .then(()=>{aux++;})
  }
  console.info("Done ! Trello App Completed");
}

module.exports = {
  startTrelloApp : startTrelloApp
};