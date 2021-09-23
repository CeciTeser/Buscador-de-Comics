// ------------------VARIABLES-------------------------

let containerCards = document.querySelector('#container-cards');
const limit = 20;
const params = new URLSearchParams(window.location.search);
const page = params.get('page') == undefined ? 1 : params.get('page');
const offset = (page - 1) * limit;

const formSearch = document.getElementById('form-search');


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
    const url = './detail-card.html';
    promise.then(
        (charactersResponse) => {
            let content = '';
            for (const character of charactersResponse.characters) {
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
};


// ------------------RESULTS COMICS-------------------------

const displayResultComics = (nameStartsWith, orderBy) => {
    const promise = fetchComics(offset, limit, nameStartsWith, orderBy);
    const url = './detail-card.html';
    promise.then(
        (comicsResponse) => {
            let content = '';
            for (const comic of comicsResponse.comics) {
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
};
// ------------------ ASSEMBLE CARD -------------------------

const getCellHTML = (classCard, url, thumbnailUrl, alt, title ) =>{
    const cellHTML = "<div class=\"" + classCard + "\"><a href=\"" + url + "\"><img src=\"" + thumbnailUrl + "\" alt=\"" + alt + "\"></a><h3>" + title + "</h3></div>";
    return cellHTML;
};

// ------------------DISPLAY BY FILTER-------------------------

const getFiltersSearch = (event) =>{
    
    event.preventDefault(); 
    const form = event.target

    const myFilters ={
		type: form.typeselect.value,
		orderBy: form.orderselect.value,
        nameStartsWith: form.namestartswith.value,
	};

    params.set("type",myFilters.type)
    params.set("orderby", myFilters.orderBy) 
    params.set("nameStartsWith", myFilters.nameStartsWith) 
        
    window.location.href=`index.html?${params}`.toString();

};
formSearch.addEventListener('submit', getFiltersSearch);

let type = params.get("type")||'comics'
let orderBy= params.get("orderby")
let nameStartWith = params.get("nameStartsWith")


displayGridCard(type,undefined,undefined);
console.log(type,nameStartWith, orderBy)

// ------------------PAGINATION-------------------------

const displayPaged = (total) =>{
    const qtyPages = Math.ceil(total / limit);
    const pagesList = document.getElementById('pages');
    const currentPage = page == undefined ? 1 : parseInt(page);
    let listContent = '';

    if(currentPage != 1){
        const back = `<li><a href="index.html?page=${currentPage - 1}"><</a></li>`;
        listContent += back;
        const first = `<li><a href="index.html?page=1">1</a></li>`;
        listContent += first;
    }

    if(currentPage - 3 > 1){
        const dots = `<li><span>...</span></li>`;
        listContent += dots;    
    }

    if(currentPage - 2 > 1){
        const prev_2 = `<li><a href="index.html?page=${currentPage - 2}">${currentPage - 2}</a></li>`;
        listContent += prev_2;    
    }

    if(currentPage - 1 > 1){
        const prev_1 = `<li><a href="index.html?page=${currentPage - 1}">${currentPage - 1}</a></li>`;
        listContent += prev_1;    
    }

    const current = `<li><a href="index.html?page=${currentPage}">${currentPage}</a></li>`;
    listContent += current;

    if(currentPage + 1 < qtyPages){
        const next_1 = `<li><a href="index.html?page=${currentPage + 1}">${currentPage + 1}</a></li>`;
        listContent += next_1;
    }

    if(currentPage + 2 < qtyPages){
        const next_2 = `<li><a href="index.html?page=${currentPage + 2}">${currentPage + 2}</a></li>`;
        listContent += next_2;
    }

    if(currentPage + 3 < qtyPages){
        const dots = `<li><span>...</span></li>`;
        listContent += dots; 
    }

    if(currentPage != qtyPages){
        const last = `<li><a href="index.html?page=${qtyPages}">${qtyPages}</a></li>`;
        listContent += last;
        const next = `<li><a href="index.html?page=${currentPage + 1}">></a></li>`;
        listContent += next;
    }

    pagesList.innerHTML = listContent;
};
