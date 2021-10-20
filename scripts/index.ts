// ------------------VARIABLES-------------------------

const containerCards = document.querySelector('#container-cards');
const error = document.getElementById('error');
const limit = 20;
const params = new URLSearchParams(window.location.search);
const page = params.get('page') == undefined ? 1 : parseInt(params.get('page'));
const offset = (page - 1) * limit;
const formSearch = document.getElementById('form-search');
const orderSelect = document.getElementById('order-select');
const typeSelect = document.getElementById('type-select');


// ------------------DISPLAY GRID CARD-------------------------
const displayGridCard = (type:string, nameStartsWith:string, orderBy:string) => {
    if(type === 'characters'){
        displayResultCharacters(nameStartsWith, orderBy);
    }else {
        displayResultComics(nameStartsWith, orderBy);
    }

};

// ------------------RESULTS CHARACTERS-------------------------
const displayResultCharacters = (nameStartsWith:string, orderBy:string) => {
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
        (error:string) => {
            showErrorMessage();
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
        (error:string) => {
            showErrorMessage();
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

const setCurrentSearchParameters = (type:string, nameStartWith:string, orderBy:string) => {
    formSearch.namestartswith.value = nameStartWith;
    formSearch.orderselect.value = orderBy;
    formSearch.typeselect.value = type;
}

const showErrorMessage = () => {
    error.innerHTML = messageError('Algo salió mal, por favor intenta más tarde.');
    containerCards.innerHTML = '';
    document.querySelector('.results-numbers').innerHTML = '';
}

formSearch.addEventListener('submit', searchByFilters);
typeSelect.addEventListener('change', () => {buildOrderBySelectByType(formSearch.typeselect.value)});

let type = params.get("type") || 'comics';
let nameStartWith = params.get("namestartswith");
let orderBy = params.get("orderby");


setCurrentSearchParameters(type, nameStartWith, orderBy);
buildOrderBySelectByType(type);
displayGridCard(type, nameStartWith, orderBy);

