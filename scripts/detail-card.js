// ------------------VARIABLES-------------------------
var detail = document.getElementById('description-detail');
var error = document.getElementById('error');
var containerCards = document.querySelector('#container-cards');
var titleResults = document.getElementById('title-results');
var totalResults = document.getElementById('total-results');
var params = new URLSearchParams(window.location.search);
var limit = 20;
var page = params.get('page') == undefined ? 1 : parseInt(params.get('page'));
var offset = (page - 1) * limit;
var formSearch = document.getElementById('form-search');
var orderSelect = document.getElementById('order-select');
var typeSelect = document.getElementById('type-select');
var imgHeaderDetail = document.getElementById('img-header-detail');
var imageDetail = document.getElementById('image-detail');
// ------------------FETCH DETAIL-------------------------
var fetchDetail = function () {
    var type = params.get('type');
    var id = params.get('id');
    var content = '';
    if (type == 'comic') {
        fetchComicById(id).then(function (comic) {
            showDetailByComic(comic.title, comic.thumbnailUrl, comic.modified, comic.description, comic.creators);
            fetchCharactersByComic(id, offset, limit).then(function (charactersResponse) {
                for (var _i = 0, _a = charactersResponse.characters; _i < _a.length; _i++) {
                    var character = _a[_i];
                    var cell = getCellHTML('col', "./detail-card.html?id=" + character.id + "&type=character", character.thumbnailUrl, character.name, character.name);
                    content += cell;
                }
                titleResults.innerHTML = 'Personajes';
                totalResults.innerHTML = charactersResponse.total;
                containerCards.innerHTML = content;
                displayPaged(charactersResponse.total, limit, page, 'detail-card.html');
            }, function (error) {
                showErrorMessage();
            });
            imgHeaderDetail.classList.add('img-header-detail-comic');
        }, function (error) {
            showErrorMessage();
        });
    }
    else if (type == 'character') {
        fetchCharacterById(id).then(function (character) {
            showDetailByCharacter(character.name, character.thumbnailUrl, character.description);
            fetchComicsByCharacter(id, offset, limit).then(function (comicsResponse) {
                for (var _i = 0, _a = comicsResponse.comics; _i < _a.length; _i++) {
                    var comic = _a[_i];
                    var cell = getCellHTML('col', "./detail-card.html?id=" + comic.id + "&type=comic", comic.thumbnailUrl, comic.title, comic.title);
                    content += cell;
                }
                titleResults.innerHTML = 'Comics';
                totalResults.innerHTML = comicsResponse.total;
                containerCards.innerHTML = content;
                displayPaged(comicsResponse.total, limit, page, 'detail-card.html');
            }, function (error) {
                showErrorMessage();
            });
            imgHeaderDetail.classList.add('img-header-detail-character');
        }, function (error) {
            showErrorMessage();
        });
    }
};
// ------------------SHOW DETAIL BY COMIC-------------------------
var showDetailByComic = function (title, thumbnailUrl, modified, description, creators) {
    var detailComic = document.getElementById('description-detail');
    var titleDetail = document.createElement('h2');
    var hPublishedDetail = document.createElement('h3');
    var pPublishedDetail = document.createElement('p');
    var hWritersDetail = document.createElement('h3');
    var pWritersDetail = document.createElement('p');
    var hDescriptionDetail = document.createElement('h3');
    var pDescriptionDetail = document.createElement('p');
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
};
// ------------------SHOW DETAIL BY CHARACTER-------------------------
var showDetailByCharacter = function (name, thumbnailUrl, description) {
    var detailCharacter = document.getElementById('description-detail');
    var titleDetail = document.createElement('h2');
    var pDescriptioDetail = document.createElement('p');
    imageDetail.src = thumbnailUrl;
    imageDetail.alt = name;
    titleDetail.innerHTML = name;
    pDescriptioDetail.innerHTML = description;
    detailCharacter.appendChild(titleDetail);
    detailCharacter.appendChild(pDescriptioDetail);
};
var showErrorMessage = function () {
    error.innerHTML = messageError('Algo salió mal, por favor intenta más tarde.');
    detail.innerHTML = '';
    containerCards.innerHTML = '';
    imageDetail.src = '';
    imageDetail.alt = '';
    document.querySelector('.results-numbers').innerHTML = '';
};
typeSelect.addEventListener('change', function () { buildOrderBySelectByType(formSearch.typeselect.value); });
fetchDetail();
buildOrderBySelectByType(formSearch.typeselect.value);
