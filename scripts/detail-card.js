var backButton = document.getElementById('back-button');
var containerDetailCard = document.getElementById('container-detail-card');
var contentDetailCard = '';
var fetchComicById = function (id) {
    var urlApi = "" + getApiBaseUrl('comics/' + id);
    var promise = new Promise(function (resolve, reject) {
        fetch(urlApi)
            .then(function (res) { return res.json(); })
            .then(function (json) {
            var item = json.data.results[0];
            var comic = new Comic();
            comic.id = item.id;
            var creators = [];
            for (var _i = 0, _a = item.creators.items; _i < _a.length; _i++) {
                var creator = _a[_i];
                creators.push(creator.name);
            }
            contentDetailCard += "\n            <div class=\"cardDetail\">\n                <h3>" + (comic.title = item.title) + "<h3>\n                <div class=\"img-text-display\">\n                    <a href=\"" + item + "\">\n                    <img src=\"" + item.thumbnail.path + "/portrait_uncanny." + item.thumbnail.extension + "\" alt=\"" + item.title + "\">\n                    </a>\n                    <div class=\"text-display\">\n                        <p> <span>Modificado:</span> " + (comic.modified = item.modified) + "<p>\n                        <p> <span>Descripci\u00F3n:</span> " + (comic.description = item.description) + "<p>\n                        <p> <span>Creadores:</span> " + (comic.creators = creators) + "<p>\n                    </div>\n                </div>\n            </div>";
            containerDetailCard.innerHTML = contentDetailCard;
            resolve(comic);
        })["catch"](function (error) {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
};
fetchComicById(3898).then(resolve = function (comic) {
    console.log(comic);
}, reject = function (error) {
    console.log(error);
});
var goBackHome = function () {
    window.location.href = '../index.html';
};
backButton.addEventListener('click', goBackHome);
