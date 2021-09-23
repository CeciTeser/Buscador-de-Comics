// ------------------VARIABLES-------------------------
var containerCards = document.querySelector('#container-cards');
var limit = 20;
var params = new URLSearchParams(window.location.search);
var page = params.get('page') == undefined ? 1 : params.get('page');
var offset = (page - 1) * limit;
var formSearch = document.getElementById('form-search');
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
    var url = './detail-card.html';
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
    var url = './detail-card.html';
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
// ------------------ ASSEMBLE CARD -------------------------
var getCellHTML = function (classCard, url, thumbnailUrl, alt, title) {
    var cellHTML = "<div class=\"" + classCard + "\"><a href=\"" + url + "\"><img src=\"" + thumbnailUrl + "\" alt=\"" + alt + "\"></a><h3>" + title + "</h3></div>";
    return cellHTML;
};
// ------------------DISPLAY BY FILTER-------------------------
var getFiltersSearch = function (event) {
    event.preventDefault();
    var form = event.target;
    var myFilters = {
        type: form.typeselect.value,
        orderBy: form.orderselect.value,
        nameStartsWith: form.namestartswith.value
    };
    params.set("type", myFilters.type);
    params.set("orderby", myFilters.orderBy);
    params.set("nameStartsWith", myFilters.nameStartsWith);
    window.location.href = ("index.html?" + params).toString();
};
formSearch.addEventListener('submit', getFiltersSearch);
var type = params.get("type") || 'comics';
var orderBy = params.get("orderby");
var nameStartWith = params.get("nameStartsWith");
displayGridCard(type, undefined, undefined);
console.log(type, nameStartWith, orderBy);
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
