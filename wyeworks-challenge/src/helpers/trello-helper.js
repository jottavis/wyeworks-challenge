
const BASE_YEAR = 1900;
var max = 0;
var min = 0;


function getDecadesAmount(discography){
    let dates = discography.map(album=>album.year);
    max= Math.max(...dates);
    min = Math.min(...dates);
    return Math.ceil((max-min)/10);
}

function getDecade(year){
    return ((year-BASE_YEAR)%10)===0? (year-BASE_YEAR) : ((year-BASE_YEAR)-((year-BASE_YEAR)%10));
}

function buildListsArray(discography){
    console.info("Building Board Lists")
    let listsArray = [];
    let listsAmount = getDecadesAmount(discography);
    let baseDecade = getDecade(min);
    let aux = 0;
    while(aux < listsAmount){
        listsArray.push({
            decade : baseDecade
        });
        baseDecade+=10;
        ++aux;
    }
    return listsArray;
}

function getListByDecade(lists,decade) {
    for (var prop in lists) {
        if (lists[prop].decade == decade) {
            return lists[prop].id;
        }
    }
    return {};
}

function sortDiscography (discography){
    discography.sort((x,y)=>{
        return x.year - y.year == 0 ? sortAphabetically(x,y) : x.year - y.year;
    });
}

function sortAphabetically(x,y){
    let a = x.name.toUpperCase(),
        b = y.name.toUpperCase();
    return a == b ? 0 : a > b ? 1 : -1;
}

function getListName (decade){
    return decade >= 100? BASE_YEAR + decade : decade;
}

module.exports = {
    buildListsArray : buildListsArray,
    getDecade : getDecade,
    getListByDecade : getListByDecade,
    sortDiscography : sortDiscography,
    getListName : getListName
};