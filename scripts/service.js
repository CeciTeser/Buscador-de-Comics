// ------------------VARIABLES-------------------------
var publicKey = '599dd05f6c024df338ffe852c0ab7ab6';
var privateKey = '00c84ded5b2ef0ea50b0bd5e553aa2c9a2102b2e';
// ------------------URL API-------------------------
var getApiBaseUrl = function (service) {
    var ts = Date.now();
    var hash = CryptoJS.MD5(ts + privateKey + publicKey);
    var urlApi = "https://gateway.marvel.com:443/v1/public/" + service + "?ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash;
    return urlApi;
};
// ------------------ CHARACTERS -------------------------
// ------------------FETCH CHARACTERS-------------------------
var fetchCharacters = function (offset, limit, nameStartsWith, orderBy) {
    showLoader();
    var urlApi = getApiBaseUrl('characters') + "&offset=" + offset + "&limit=" + limit;
    if (nameStartsWith != undefined && nameStartsWith != '') {
        urlApi += "&nameStartsWith=" + nameStartsWith;
    }
    if (orderBy != undefined) {
        urlApi += "&orderBy=" + orderBy;
    }
    var promise = new Promise(function (resolve, reject) {
        fetch(urlApi)
            .then(function (res) { return res.json(); })
            .then(function (json) {
            var characters = [];
            for (var _i = 0, _a = json.data.results; _i < _a.length; _i++) {
                var itemCharacter = _a[_i];
                var character = new Character();
                character.id = itemCharacter.id;
                character.name = itemCharacter.name;
                character.thumbnailUrl = itemCharacter.thumbnail.path + "/portrait_uncanny." + itemCharacter.thumbnail.extension;
                characters.push(character);
            }
            var charactersResponse = new CharactersResponse();
            charactersResponse.characters = characters;
            charactersResponse.offset = json.data.offset;
            charactersResponse.limit = json.data.limit;
            charactersResponse.total = json.data.total;
            resolve(charactersResponse);
            hideLoader();
        })["catch"](function (error) {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
};
// ------------------FETCH CHARACTERS BY ID-------------------------
var fetchCharacterById = function (id) {
    showLoader();
    var urlApi = "" + getApiBaseUrl('characters/' + id);
    var promise = new Promise(function (resolve, reject) {
        fetch(urlApi)
            .then(function (res) { return res.json(); })
            .then(function (json) {
            var item = json.data.results[0];
            var character = new Character();
            character.id = item.id;
            character.name = item.name;
            character.description = item.description;
            character.thumbnailUrl = item.thumbnail.path + "." + item.thumbnail.extension;
            resolve(character);
            hideLoader();
        })["catch"](function (error) {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
};
// ------------------FETCH COMICS BY CHARACTERS-------------------------
var fetchComicsByCharacter = function (characterId, offset, limit) {
    showLoader();
    var urlApi = getApiBaseUrl("characters/" + characterId + "/comics") + "&offset=" + offset + "&limit=" + limit;
    var promise = new Promise(function (resolve, reject) {
        fetch(urlApi)
            .then(function (res) { return res.json(); })
            .then(function (json) {
            var comics = [];
            for (var _i = 0, _a = json.data.results; _i < _a.length; _i++) {
                var item = _a[_i];
                var comic = new Comic();
                comic.id = item.id;
                comic.title = item.title;
                comic.thumbnailUrl = item.thumbnail.path + "/portrait_uncanny." + item.thumbnail.extension;
                comics.push(comic);
            }
            var comicsResponse = new ComicsResponse();
            comicsResponse.comics = comics;
            comicsResponse.offset = json.data.offset;
            comicsResponse.limit = json.data.limit;
            comicsResponse.total = json.data.total;
            resolve(comicsResponse);
            hideLoader();
        })["catch"](function (error) {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
};
// ------------------ COMICS -------------------------
// ------------------FETCH COMICS-------------------------
var fetchComics = function (offset, limit, titleStartsWith, orderBy) {
    showLoader();
    var urlApi = getApiBaseUrl('comics') + "&offset=" + offset + "&limit=" + limit;
    if (titleStartsWith != undefined && titleStartsWith != '') {
        urlApi += "&titleStartsWith=" + titleStartsWith;
    }
    if (orderBy != undefined) {
        urlApi += "&orderBy=" + orderBy;
    }
    var promise = new Promise(function (resolve, reject) {
        fetch(urlApi)
            .then(function (res) { return res.json(); })
            .then(function (json) {
            var comics = [];
            for (var _i = 0, _a = json.data.results; _i < _a.length; _i++) {
                var itemComic = _a[_i];
                var comic = new Comic();
                comic.id = itemComic.id;
                comic.title = itemComic.title;
                comic.thumbnailUrl = itemComic.thumbnail.path + "/portrait_uncanny." + itemComic.thumbnail.extension;
                comic.modified = new Date(itemComic.modified);
                comics.push(comic);
            }
            var comicsResponse = new ComicsResponse();
            comicsResponse.comics = comics;
            comicsResponse.offset = json.data.offset;
            comicsResponse.limit = json.data.limit;
            comicsResponse.total = json.data.total;
            resolve(comicsResponse);
            hideLoader();
        })["catch"](function (error) {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
};
// ------------------FETCH COMICS BY ID-------------------------
var fetchComicById = function (id) {
    showLoader();
    var urlApi = "" + getApiBaseUrl('comics/' + id);
    var promise = new Promise(function (resolve, reject) {
        fetch(urlApi)
            .then(function (res) { return res.json(); })
            .then(function (json) {
            var item = json.data.results[0];
            var comic = new Comic();
            var creators = [];
            comic.id = item.id;
            comic.title = item.title;
            comic.thumbnailUrl = item.thumbnail.path + "/portrait_uncanny." + item.thumbnail.extension;
            comic.modified = new Date(item.modified);
            for (var _i = 0, _a = item.creators.items; _i < _a.length; _i++) {
                var creator = _a[_i];
                creators.push(creator.name);
            }
            comic.creators = creators;
            resolve(comic);
            hideLoader();
        })["catch"](function (error) {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
};
// ------------------FETCH CHARACTERS BY COMICS-------------------------
var fetchCharactersByComic = function (comicId, offset, limit) {
    showLoader();
    var urlApi = getApiBaseUrl("comics/" + comicId + "/characters") + "&offset=" + offset + "&limit=" + limit;
    var promise = new Promise(function (resolve, reject) {
        fetch(urlApi)
            .then(function (res) { return res.json(); })
            .then(function (json) {
            var characters = [];
            for (var _i = 0, _a = json.data.results; _i < _a.length; _i++) {
                var item = _a[_i];
                var character = new Character();
                character.id = item.id;
                character.name = item.name;
                character.thumbnailUrl = item.thumbnail.path + "/portrait_uncanny." + item.thumbnail.extension;
                characters.push(character);
            }
            var charactersResponse = new CharactersResponse();
            charactersResponse.characters = characters;
            charactersResponse.offset = json.data.offset;
            charactersResponse.limit = json.data.limit;
            charactersResponse.total = json.data.total;
            resolve(charactersResponse);
            hideLoader();
        })["catch"](function (error) {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
};
