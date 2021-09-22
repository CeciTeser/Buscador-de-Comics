// ------------------VARIABLES-------------------------
var containerCards = document.querySelector('#container-cards');
var limit = 20;
var params = new URLSearchParams(window.location.search);
var page = params.get('page') == undefined ? 1 : params.get('page');
var offset = (page - 1) * limit;
var searchButton = document.getElementById('search-button');
var typeSelect = document.getElementById('type-select');
var paramType = new URLSearchParams(window.location.search);
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
    var url = './aca va el html que lleva al detalle de un personaje';
    promise.then(function (charactersResponse) {
        var content = '';
        for (var _i = 0, _a = charactersResponse.characters; _i < _a.length; _i++) {
            var character = _a[_i];
            var cell = getCellHTML('cards-characters', url, character.thumbnailUrl, character.name, character.name);
            content += cell;
        }
        containerCards.innerHTML = content;
        var totalResults = document.getElementById('total-results');
        totalResults.innerHTML = charactersResponse.total;
        displayPaged(charactersResponse.total);
    }, function (error) {
    });
};
// ------------------RESULTS COMICS-------------------------
var displayResultComics = function (nameStartsWith, orderBy) {
    var promise = fetchComics(offset, limit, nameStartsWith, orderBy);
    var url = './aca va el html que lleva al detalle de un comic';
    promise.then(function (comicsResponse) {
        var content = '';
        for (var _i = 0, _a = comicsResponse.comics; _i < _a.length; _i++) {
            var comic = _a[_i];
            var cell = getCellHTML('cards-comics', url, comic.thumbnailUrl, comic.title, comic.title);
            content += cell;
        }
        containerCards.innerHTML = content;
        var totalResults = document.getElementById('total-results');
        totalResults.innerHTML = comicsResponse.total;
        displayPaged(comicsResponse.total);
    }, function (error) {
    });
};
// ------------------DISPLAY GRID CARD-------------------------
var getCellHTML = function (classCard, url, thumbnailUrl, alt, title) {
    var cellHTML = "<div class=\"" + classCard + "\"><a href=\"" + url + "\"><img src=\"" + thumbnailUrl + "\" alt=\"" + alt + "\"></a><h3>" + title + "</h3></div>";
    return cellHTML;
};
// displayGridCard('characters', undefined, undefined);
// displayGridCard('comics', undefined, undefined);
// ------------------DISPLAY BY TYPE-------------------------
var showType = function (event) {
    event.preventDefault();
    paramType.set("type", typeSelect.value);
    window.location.href = ("index.html?" + paramType).toString();
};
searchButton.addEventListener('click', showType);
displayGridCard(paramType.get('type') || 'comic', undefined, undefined);
// ------------------PAGINATION-------------------------
var displayPaged = function (total) {
    var qtyPages = Math.ceil(total / limit);
    var pagesList = document.getElementById('pages');
    var currentPage = page == undefined ? 1 : parseInt(page);
    var listContent = '';
    if (currentPage != 1) {
        var back = "<li><a href=\"index.html?page=" + (currentPage - 1) + "\"><</a></li>";
        listContent += back;
        var first = "<li><a href=\"index.html?page=1\">1</a></li>";
        listContent += first;
    }
    if (currentPage - 3 > 1) {
        var dots = "<li><span>...</span></li>";
        listContent += dots;
    }
    if (currentPage - 2 > 1) {
        var prev_2 = "<li><a href=\"index.html?page=" + (currentPage - 2) + "\">" + (currentPage - 2) + "</a></li>";
        listContent += prev_2;
    }
    if (currentPage - 1 > 1) {
        var prev_1 = "<li><a href=\"index.html?page=" + (currentPage - 1) + "\">" + (currentPage - 1) + "</a></li>";
        listContent += prev_1;
    }
    var current = "<li><a href=\"index.html?page=" + currentPage + "\">" + currentPage + "</a></li>";
    listContent += current;
    if (currentPage + 1 < qtyPages) {
        var next_1 = "<li><a href=\"index.html?page=" + (currentPage + 1) + "\">" + (currentPage + 1) + "</a></li>";
        listContent += next_1;
    }
    if (currentPage + 2 < qtyPages) {
        var next_2 = "<li><a href=\"index.html?page=" + (currentPage + 2) + "\">" + (currentPage + 2) + "</a></li>";
        listContent += next_2;
    }
    if (currentPage + 3 < qtyPages) {
        var dots = "<li><span>...</span></li>";
        listContent += dots;
    }
    if (currentPage != qtyPages) {
        var last = "<li><a href=\"index.html?page=" + qtyPages + "\">" + qtyPages + "</a></li>";
        listContent += last;
        var next = "<li><a href=\"index.html?page=" + (currentPage + 1) + "\">></a></li>";
        listContent += next;
    }
    pagesList.innerHTML = listContent;
};
