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
    const url = `./detail-card.html`;
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
            // TODO: implementar mensaje de error a mostrar
        }
    );
};


// ------------------RESULTS COMICS-------------------------
const displayResultComics = (nameStartsWith, orderBy) => {    
    const promise = fetchComics(offset, limit, nameStartsWith, orderBy);
    const  url = `./detail-card.html`;
    promise.then(
        (comicsResponse) => {
            let content = '';
            for (const comic of comicsResponse.comics) {
                // params.set('id', comic.id)
                // params.get('id')
                const cell = getCellHTML('cards-comics', url , comic.thumbnailUrl, comic.title,  comic.title);
                content += cell;
                // + '&' + `${params}`
            }
            containerCards.innerHTML = content;
            const totalResults = document.getElementById('total-results');
            totalResults.innerHTML = comicsResponse.total;
            displayPaged(comicsResponse.total)
        }, 
        (error) => {
             // TODO: implementar mensaje de error a mostrar
        }
    );
};
// ------------------ ASSEMBLE CARD -------------------------
const getCellHTML = (classCard, url, thumbnailUrl, alt, title) =>{
    const cellHTML = "<div class=\"" + classCard + "\"><a href=\"" + url + "\"><img src=\"" + thumbnailUrl + "\" alt=\"" + alt + "\"></a><h3>" + title + "</h3></div>";
    
    return cellHTML;
};


// ------------------DISPLAY BY FILTER-------------------------
const searchByFilters = (event) =>{    
    event.preventDefault(); 
    const form = event.target;

    params.set("type", form.typeselect.value);

    let orderBy = form.orderselect.value;
    
    if(orderBy == 'az'){
        orderBy = form.typeselect.value == 'comics' ? 'title' : 'name';
    }else if(orderBy == 'za'){
        orderBy = form.typeselect.value == 'comics' ? '-title' : '-name'; 
    }
    
    params.set("orderby", orderBy);
    
    if(form.namestartswith.value != ''){
        params.set("namestartswith", form.namestartswith.value) 
    }else{
        params.delete("namestartswith");      
    }

    params.delete("page");
        
    window.location.href=`index.html?${params}`;

};


const setCurrentSearchParameters = (type, nameStartWith, orderBy) => {
    formSearch.namestartswith.value = nameStartWith;
    if(orderBy == 'title' || orderBy == 'name'){
        formSearch.orderselect.value = 'az';
    }else if(orderBy == '-title' || orderBy == '-name'){
        formSearch.orderselect.value = 'za';
    }else{
        formSearch.orderselect.value = orderBy;
    }

    formSearch.typeselect.value = type;
}


// ------------------PAGINATION-------------------------
const getPageLi = (page, content) => {
    params.set("page", page);
    const li = `<li><a href="index.html?${params}">${content}</a></li>`;
    return li;
}

const displayPaged = (total) =>{
    const qtyPages = Math.ceil(total / limit);
    const pagesList = document.getElementById('pages');
    const currentPage = page == undefined ? 1 : parseInt(page);
    let listContent = '';

    if(currentPage != 1){
        const back = getPageLi(currentPage - 1, "<");
        listContent += back;
        const first = getPageLi(1, "1");
        listContent += first;
    }

    if(currentPage - 3 > 1){
        const dots = `<li><span>...</span></li>`;
        listContent += dots;    
    }

    if(currentPage - 2 > 1){
        const prev_2 = getPageLi(currentPage - 2, `${currentPage - 2}`);
        listContent += prev_2;    
    }

    if(currentPage - 1 > 1){
        const prev_1 = getPageLi(currentPage - 1, `${currentPage - 1}`);
        listContent += prev_1;    
    }

    const current = getPageLi(currentPage, `${currentPage}`);
    listContent += current;

    if(currentPage + 1 < qtyPages){
        const next_1 = getPageLi(currentPage + 1, `${currentPage + 1}`);
        listContent += next_1;
    }

    if(currentPage + 2 < qtyPages){
        const next_2 = getPageLi(currentPage + 2, `${currentPage + 2}`);
        listContent += next_2;
    }

    if(currentPage + 3 < qtyPages){
        const dots = `<li><span>...</span></li>`;
        listContent += dots; 
    }

    if(currentPage != qtyPages){
        const last = getPageLi(qtyPages, `${qtyPages}`);
        listContent += last;
        const next = getPageLi(currentPage + 1, ">");
        listContent += next;
    }

    pagesList.innerHTML = listContent;
};


formSearch.addEventListener('submit', searchByFilters);

let type = params.get("type")||'comics';
let orderBy= params.get("orderby");
let nameStartWith = params.get("namestartswith");
displayGridCard(type, nameStartWith, orderBy);

// ------------------DISPLAY SELECT ORDER BY-------------------------

const searchSelectOrderBy=()=>{
    if (formSearch.typeselect.value === 'comics') {
        orderSelect.innerHTML = ''
        const opAz = document.createElement('option')
        opAz.appendChild(document.createTextNode('A-Z'))
        opAz.setAttribute('value', 'title')
        orderSelect.appendChild(opAz)

        const opza = document.createElement('option')
        opza.appendChild(document.createTextNode('Z-A'))
        opza.setAttribute('value', '-title')
        orderSelect.appendChild(opza)


        const opNewer = document.createElement('option')
        opNewer.appendChild(document.createTextNode('Más nuevos'))
        opNewer.setAttribute('value', '-focDate')
        orderSelect.appendChild(opNewer)

        const opOlder = document.createElement('option')
        opOlder.appendChild(document.createTextNode('Más viejos'))
        opOlder.setAttribute('value', 'focDate')
        orderSelect.appendChild(opOlder)
    }

    if (formSearch.typeselect.value === 'characters') {

        orderSelect.innerHTML = ''

        const opAz = document.createElement('option')
        opAz.appendChild(document.createTextNode('A-Z'))
        opAz.setAttribute('value', 'name')
        orderSelect.appendChild(opAz)

        const opza = document.createElement('option')
        opza.appendChild(document.createTextNode('Z-A'))
        opza.setAttribute('value', '-name')
        orderSelect.appendChild(opza)
    }
};

typeSelect.addEventListener('change', searchSelectOrderBy)
searchSelectOrderBy();
setCurrentSearchParameters(type, nameStartWith, orderBy);

