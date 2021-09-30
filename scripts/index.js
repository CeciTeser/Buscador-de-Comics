// ------------------VARIABLES-------------------------

const containerCards = document.querySelector('#container-cards');
const limit = 20;
const params = new URLSearchParams(window.location.search);
const page = params.get('page') == undefined ? 1 : parseInt(params.get('page'));
const offset = (page - 1) * limit;
const formSearch = document.getElementById('form-search');
const orderSelect = document.getElementById('order-select');
const typeSelect = document.getElementById('type-select');


// ------------------DISPLAY GRID CARD-------------------------
const displayGridCard = (type, nameStartsWith, orderBy) => {
    if(type === 'characters'){
        displayResultCharacters(nameStartsWith, orderBy);
    }else {
        displayResultComics(nameStartsWith, orderBy);
    }
};

// ------------------RESULTS CHARACTERS-------------------------
const displayResultCharacters = (nameStartsWith, orderBy) => {
    const promise = fetchCharacters(offset, limit, nameStartsWith, orderBy);
    promise.then(
        (charactersResponse) => {
            let content = '';
            for (const character of charactersResponse.characters) {
                const cell = getCellHTML('cards-characters',  `./detail-card.html?id=${character.id}&type=character`, character.thumbnailUrl, character.name,  character.name);
                content += cell;
            }
            containerCards.innerHTML = content;
            const totalResults = document.getElementById('total-results');
            totalResults.innerHTML = charactersResponse.total;
            displayPaged(charactersResponse.total, limit, page, 'index.html');
        }, 
        (error) => {
            // TODO: implementar mensaje de error a mostrar
        }
    );
};

// ------------------RESULTS COMICS-------------------------
const displayResultComics = (nameStartsWith, orderBy) => {    
    const promise = fetchComics(offset, limit, nameStartsWith, orderBy);
    promise.then(
        (comicsResponse) => {
            let content = '';
            for (const comic of comicsResponse.comics) {
                const cell = getCellHTML('cards-comics', `./detail-card.html?id=${comic.id}&type=comic` , comic.thumbnailUrl, comic.title,  comic.title);
                content += cell;
                //
            }
            containerCards.innerHTML = content;
            const totalResults = document.getElementById('total-results');
            totalResults.innerHTML = comicsResponse.total;
            displayPaged(comicsResponse.total, limit, page, 'index.html')
        }, 
        (error) => {
             // TODO: implementar mensaje de error a mostrar
        }
    );
};

// ------------------DISPLAY BY FILTER-------------------------
const searchByFilters = (event) =>{    
    event.preventDefault(); 
    const form = event.target;

    params.set("type", form.typeselect.value);
    
    params.set("orderby",  form.orderselect.value);
    
    if(form.namestartswith.value != ''){
        params.set("namestartswith", form.namestartswith.value); 
    }else{
        params.delete("namestartswith");      
    }

    params.delete("page");
        
    window.location.href=`index.html?${params}`;
};

const setCurrentSearchParameters = (type, nameStartWith, orderBy) => {
    formSearch.namestartswith.value = nameStartWith;
    formSearch.orderselect.value = orderBy;
    formSearch.typeselect.value = type;
}



formSearch.addEventListener('submit', searchByFilters);
typeSelect.addEventListener('change', () => {buildOrderBySelectByType(formSearch.typeselect.value)});

let type = params.get("type") || 'comics';
let nameStartWith = params.get("namestartswith");
let orderBy = params.get("orderby");
displayGridCard(type, nameStartWith, orderBy);
buildOrderBySelectByType(type);
// TODO: arreglar valor default select orderby
setCurrentSearchParameters(type, nameStartWith, orderBy);