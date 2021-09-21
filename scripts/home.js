var containerCards = document.querySelector('#container-cards');
// const type = document.getElementById('type-select');
const limit = 20;
const params = new URLSearchParams(window.location.search);
const page = params.get('page') == undefined ? 1 : params.get('page');
const offset = (page - 1) * limit;


// // Content tiene que estar dentro de la funcion
// var content = '';
// //En el front no se llama directamente a los servicios
// var url1 = "" + getApiBaseUrl('comics');
// var url2 = "" + getApiBaseUrl('characters');
// var comicClass = "cards-comics";
// var characterClass = "cards-characters";
// var titleComic = "title";
// var nameCharacter = "name";
// var displayGridCard = function (url, classCard, titleName) {
//     // esto era provisorio para ver las cards en la pantalla
//     fetch(url)
//         .then(function (res) { return res.json(); })
//         .then(function (json) {
//         console.log("json", json);
//         // lo que tendriamos que recorrer es el resultado de nuestros datos y no volver a recorrer los datos del Json
//         for (var _i = 0, _a = json.data.results; _i < _a.length; _i++) {
//             var item = _a[_i];
//             // esta Url tiene que ser la del detalle del comic o del personaje que nos lleve al hacer click, aca nos lleva a la pagina de Marvel
//             var url_1 = item.urls[0].url;
//             content += "\n            <div class=\"" + classCard + "\">\n                <a href=\"" + url_1 + "\">\n                    <img src=\"" + item.thumbnail.path + "/portrait_uncanny." + item.thumbnail.extension + "\" alt=\"" + item.name + "\">\n                </a>\n                <h3>" + item[titleName] + "</h3>\n            </div>";
//             // esto esta ok para traer el total, pero deberia ir fuera del for porque asi se estaria mostrando cada vez por cada item de la iteracion
//             var totalResults = document.getElementById('total-results');
//             totalResults.innerHTML = "" + json.data.total;
//         }
//         containerCards.innerHTML = content;
//     });
// };

// displayGridCard(url1, comicClass, titleComic);
// displayGridCard(url2, characterClass, nameCharacter);


// Esta fc llama a la funcion que muestra los personajes o los comics segun el tipo que se filtre en el front

const displayGridCard = (type, nameStartsWith, orderBy) => {
    if(type === 'characters'){
        displayResultCharacters(nameStartsWith, orderBy);
    }else{
        displayResultComics(nameStartsWith, orderBy);    
    }
};

const displayResultCharacters = (nameStartsWith, orderBy) => {
    // aca llamamos la funcion del fetchCharacters y como parametro recibe el offset y el limit que son variables declaradas al inicio, los otros dos parametros los recibe del front. Esta funcion devuelve una promise
    const promise = fetchCharacters(offset, limit, nameStartsWith, orderBy);
    // Acá iria la url del detalle de un comic, esta puesto provisorio
    var url = './aca va el html que lleva al detalle de un personaje';
    // Aca ejecutamos la promise que recibe la funcion resolve y reject. En la funcion resolve la promise va a pasar como parametros los resultados de la respuesta del servicio transformados a nuestro objeto definido en el ts.
    promise.then(
        (charactersResponse) => {
            var content = '';
            for (var character of charactersResponse.characters) {
                const cell = getCellHTML('cards-characters', url, character.thumbnailUrl, character.name,  character.name);
                content += cell;
            }
            containerCards.innerHTML = content;
            const totalResults = document.getElementById('total-results');
            totalResults.innerHTML = charactersResponse.total;
            displayPaged(charactersResponse.total)
        }, 
        (error) => {

        }
    );
}

const displayResultComics = (nameStartsWith, orderBy) => {
    const promise = fetchComics(offset, limit, nameStartsWith, orderBy);
    var url = './aca va el html que lleva al detalle de un comic';
    promise.then(
        (comicsResponse) => {
            var content = '';
            for (var comic of comicsResponse.comics) {
                const cell = getCellHTML('cards-comics', url, comic.thumbnailUrl, comic.title,  comic.title);
                content += cell;
            }
            containerCards.innerHTML = content;
            const totalResults = document.getElementById('total-results');
            totalResults.innerHTML = comicsResponse.total;
            displayPaged(comicsResponse.total)
        }, 
        (error) => {

        }
    );
}

const getCellHTML = (classCard, url, thumbnailUrl, alt, title ) =>{
    const cellHTML = "<div class=\"" + classCard + "\"><a href=\"" + url + "\"><img src=\"" + thumbnailUrl + "\" alt=\"" + alt + "\"></a><h3>" + title + "</h3></div>";
    return cellHTML;
}

// cuando llamamos a la funcion displayGridCard debe recibir los value del front

displayGridCard('characters', undefined, undefined);
// displayGridCard('comics', undefined, undefined);


// Esta es la funcion del paginado, falta terminar, pero para que vean como lo estoy armando

const displayPaged = (total) =>{
    const qty = total / limit
    const pagesList = document.getElementById('pages');
    const currentPage = page == undefined ? 1 : parseInt(page);
    let list = '';
    const prev = `<li><a href="index.html?page=${currentPage - 1}"><</a></li>`;
    list += prev;

    if(currentPage != 1){
        const first = `<li><a href="index.html?page=1">1</a></li>`;
        list += first;
    }

    if(currentPage - 3 > 1){
        const prev_2 = `<li><span>...</span></li>`;
        list += prev_2;    
    }

    if(currentPage - 2 > 1){
        const prev_2 = `<li><a href="index.html?page=${currentPage-2}">${currentPage-2}</a></li>`;
        list += prev_2;    
    }

    if(currentPage - 2 > 0){
        const prev_1 = `<li><a href="index.html?page=${currentPage-1}">${currentPage-1}</a></li>`;
        list += prev_1;    
    }

    const current = `<li><a href="index.html?page=${currentPage}">${currentPage}</a></li>`;
    list += current;


    const last = `<li><a href="index.html?page=${qty}">${qty}</a></li>`;
    list += last;

    const next = `<li><a href="index.html?page=${currentPage + 1}">></a></li>`;
    list += next;

    pagesList.innerHTML = list;
}

