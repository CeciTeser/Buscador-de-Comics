var containerCards = document.querySelector('#container-cards');
var content = '';
var url1 = "" + getApiBaseUrl('comics');
var url2 = "" + getApiBaseUrl('characters');
var comicClass = "cards-comics";
var characterClass = "cards-characters";
var titleComic = "title";
var nameCharacter = "name";
var displayGridCard = function (url, classCard, titleName) {
    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (json) {
        console.log("json", json);
        for (var _i = 0, _a = json.data.results; _i < _a.length; _i++) {
            var item = _a[_i];
            var url_1 = item.urls[0].url;
            content += "\n            <div class=\"" + classCard + "\">\n                <a href=\"" + url_1 + "\">\n                    <img src=\"" + item.thumbnail.path + "/portrait_uncanny." + item.thumbnail.extension + "\" alt=\"" + item.name + "\">\n                </a>\n                <h3>" + item[titleName] + "</h3>\n            </div>";
            var totalResults = document.getElementById('total-results');
            totalResults.innerHTML = "" + json.data.total;
        }
        containerCards.innerHTML = content;
    });
};
displayGridCard(url1, comicClass, titleComic);
displayGridCard(url2, characterClass, nameCharacter);
