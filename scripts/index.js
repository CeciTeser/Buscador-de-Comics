// ------------------VARIABLES-------------------------
var containerCards = document.querySelector('#container-cards');
var error = document.getElementById('error');
var limit = 20;
var params = new URLSearchParams(window.location.search);
var page = params.get('page') == undefined ? 1 : parseInt(params.get('page'));
var offset = (page - 1) * limit;
var formSearch = document.getElementById('form-search');
var orderSelect = document.getElementById('order-select');
var typeSelect = document.getElementById('type-select');
// ------------------DISPLAY GRID CARD-------------------------
var displayGridCard = function (type, nameStartsWith, orderBy) {
    if (type === 'characters') {
        displayResultCharacters(nameStartsWith, orderBy);
    }
    else {
        displayResultComics(nameStartsWith, orderBy);
    }
};
// ------------------RESULTS CHARACTERS-------------------------
var displayResultCharacters = function (nameStartsWith, orderBy) {
    var promise = fetchCharacters(offset, limit, nameStartsWith, orderBy);
    promise.then(function (charactersResponse) {
        var content = '';
        for (var _i = 0, _a = charactersResponse.characters; _i < _a.length; _i++) {
            var character = _a[_i];
            var cell = getCellHTML('col', "./detail-card.html?id=" + character.id + "&type=character", character.thumbnailUrl, character.name, character.name);
            content += cell;
        }
        containerCards.innerHTML = content;
        var totalResults = document.getElementById('total-results');
        totalResults.innerHTML = charactersResponse.total;
        displayPaged(charactersResponse.total, limit, page, 'index.html');
    }, function (error) {
        showErrorMessage();
    });
};
// ------------------RESULTS COMICS-------------------------
var displayResultComics = function (nameStartsWith, orderBy) {
    var promise = fetchComics(offset, limit, nameStartsWith, orderBy);
    promise.then(function (comicsResponse) {
        var content = '';
        for (var _i = 0, _a = comicsResponse.comics; _i < _a.length; _i++) {
            var comic = _a[_i];
            var cell = getCellHTML('col', "./detail-card.html?id=" + comic.id + "&type=comic", comic.thumbnailUrl, comic.title, comic.title);
            content += cell;
            //
        }
        containerCards.innerHTML = content;
        var totalResults = document.getElementById('total-results');
        totalResults.innerHTML = comicsResponse.total;
        displayPaged(comicsResponse.total, limit, page, 'index.html');
    }, function (error) {
        showErrorMessage();
    });
};
// ------------------DISPLAY BY FILTER-------------------------
var searchByFilters = function (event) {
    event.preventDefault();
    var form = event.target;
    params.set("type", form.typeselect.value);
    params.set("orderby", form.orderselect.value);
    if (form.namestartswith.value != '') {
        params.set("namestartswith", form.namestartswith.value);
    }
    else {
        params["delete"]("namestartswith");
    }
    params["delete"]("page");
    window.location.href = "index.html?" + params;
};
var setCurrentSearchParameters = function (type, nameStartWith, orderBy) {
    formSearch.namestartswith.value = nameStartWith;
    formSearch.orderselect.value = orderBy;
    formSearch.typeselect.value = type;
};
var showErrorMessage = function () {
    error.innerHTML = messageError('Algo salió mal, por favor intenta más tarde.');
    containerCards.innerHTML = '';
    document.querySelector('.results-numbers').innerHTML = '';
};
formSearch.addEventListener('submit', searchByFilters);
typeSelect.addEventListener('change', function () { buildOrderBySelectByType(formSearch.typeselect.value); });
var type = params.get("type") || 'comics';
var nameStartWith = params.get("namestartswith");
var orderBy = params.get("orderby");
setCurrentSearchParameters(type, nameStartWith, orderBy);
buildOrderBySelectByType(type);
displayGridCard(type, nameStartWith, orderBy);
