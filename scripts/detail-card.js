const detail = document.getElementById('description-detail');
const error = document.getElementById('error');
const containerCards = document.querySelector('#container-cards');
const titleResults = document.getElementById('title-results');
const totalResults = document.getElementById('total-results');
const params = new URLSearchParams(window.location.search);
const limit = 20;
const page = params.get('page') == undefined ? 1 : parseInt(params.get('page'));
const offset = (page - 1) * limit;
const formSearch = document.getElementById('form-search');
const orderSelect = document.getElementById('order-select');
const typeSelect = document.getElementById('type-select');
const imgHeaderDetail = document.getElementById('img-header-detail');

const fetchDetail = () => {
    const type = params.get('type');
    const id = params.get('id');
    let content = '';
    if(type == 'comic'){
        fetchComicById(id).then(
            (comic) => {
                showDetailByComic(comic.title, comic.thumbnailUrl, comic.modified, comic.description, comic.creators);
                fetchCharactersByComic(id, offset, limit).then(
                    (charactersResponse) => {
                        for (const character of charactersResponse.characters) {
                            const cell = getCellHTML('cards-characters', `./detail-card.html?id=${character.id}&type=character`, character.thumbnailUrl, character.name,  character.name);
                            content += cell;
                        }
                        titleResults.innerHTML = 'Personajes';
                        totalResults.innerHTML = charactersResponse.total;
                        containerCards.innerHTML = content;
                        displayPaged(charactersResponse.total, limit, page, 'detail-card.html');
                    }, 
                    (error) => {
                        showErrorMessage();
                    }
                );
                imgHeaderDetail.classList.add('img-header-detail-comic');
            }, 
            (error) => {
                showErrorMessage();
            } 
        );
      
    }else if(type == 'character'){
        fetchCharacterById(id).then(
            (character) => {
                showDetailByCharacter(character.name, character.thumbnailUrl, character.description);
                fetchComicsByCharacter(id, offset, limit).then(
                    (comicsResponse) => {
                        for(const comic of comicsResponse.comics){
                            const cell = getCellHTML('cards-comics', `./detail-card.html?id=${comic.id}&type=comic`, comic.thumbnailUrl, comic.title,  comic.title);
                            content += cell;
                        }
                        titleResults.innerHTML = 'Comics';
                        totalResults.innerHTML = comicsResponse.total;
                        containerCards.innerHTML = content;
                        displayPaged(comicsResponse.total, limit, page, 'detail-card.html');
                    },
                    (error) => {
                        showErrorMessage();
                    }
                );
                imgHeaderDetail.classList.add('img-header-detail-character');
            }, 
            (error) => {
                showErrorMessage();
            }
        );
        
    }
}

const imageDetail = document.getElementById('image-detail');

const showDetailByComic = (title, thumbnailUrl, modified, description, creators) => {
    const detailComic = document.getElementById('description-detail');
    const titleDetail = document.createElement('h2');
    const hPublishedDetail = document.createElement('h3');
    const pPublishedDetail = document.createElement('p');
    const hWritersDetail = document.createElement('h3');
    const pWritersDetail = document.createElement('p');
    const hDescriptionDetail = document.createElement('h3');
    const pDescriptionDetail = document.createElement('p');
    imageDetail.src = thumbnailUrl;
    imageDetail.alt = title;

    titleDetail.innerHTML = title;
    hPublishedDetail.innerHTML = 'Publicado: ';
    pPublishedDetail.innerHTML = modified.toLocaleDateString();
    hWritersDetail.innerHTML = 'Guionistas: ';
    pWritersDetail.innerHTML = creators.join(', ') || '';
    hDescriptionDetail.innerHTML = 'Descripción';
    pDescriptionDetail.innerHTML = description || '';

    detailComic.appendChild(titleDetail);
    detailComic.appendChild(hPublishedDetail);
    detailComic.appendChild(pPublishedDetail);
    detailComic.appendChild(hWritersDetail);
    detailComic.appendChild(pWritersDetail);
    detailComic.appendChild(hDescriptionDetail);
    detailComic.appendChild(pDescriptionDetail);
}

const showDetailByCharacter = (name, thumbnailUrl, description) => {
    const detailCharacter = document.getElementById('description-detail');
    const titleDetail = document.createElement('h2');
    const pDescriptioDetail = document.createElement('p');
    imageDetail.src = thumbnailUrl;
    imageDetail.alt = name;
    titleDetail.innerHTML = name;
    pDescriptioDetail.innerHTML = description;

    detailCharacter.appendChild(titleDetail);
    detailCharacter.appendChild(pDescriptioDetail);
}

const showErrorMessage = () => {
    error.innerHTML = messageError('Algo salió mal, por favor intenta más tarde.');
    detail.innerHTML = '';
    containerCards.innerHTML = '';
    imageDetail.src = '';
    imageDetail.alt = '';
    document.querySelector('.results-numbers').innerHTML = '';
    
}


typeSelect.addEventListener('change',  () => {buildOrderBySelectByType(formSearch.typeselect.value)});

fetchDetail();
buildOrderBySelectByType(formSearch.typeselect.value);