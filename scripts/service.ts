// ------------------VARIABLES-------------------------

const publicKey = '599dd05f6c024df338ffe852c0ab7ab6';
const privateKey = '00c84ded5b2ef0ea50b0bd5e553aa2c9a2102b2e';

// ------------------URL API-------------------------

const getApiBaseUrl = (service:string) => {
    const ts = Date.now();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey);
    const urlApi = `https://gateway.marvel.com:443/v1/public/${service}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    return urlApi;
}

// ------------------ CHARACTERS -------------------------

// ------------------FETCH CHARACTERS-------------------------

const fetchCharacters = (offset:number, limit:number, nameStartsWith:string, orderBy:string) => {
    showLoader()
    let urlApi = `${getApiBaseUrl('characters')}&offset=${offset}&limit=${limit}`;
    if(nameStartsWith != undefined && nameStartsWith != ''){
        urlApi += `&nameStartsWith=${nameStartsWith}`;
    }
    if(orderBy != undefined){
        urlApi += `&orderBy=${orderBy}`;
    }

    let promise = new Promise(function(resolve, reject) {
        fetch(urlApi)
        .then(res => res.json())
        .then( (json) => {
            const characters = [];
            for(const itemCharacter of json.data.results){
                let character = new Character();
                character.id = itemCharacter.id;
                character.name = itemCharacter.name;
                character.thumbnailUrl = `${itemCharacter.thumbnail.path}/portrait_uncanny.${itemCharacter.thumbnail.extension}`;
                characters.push(character);
            }
            const charactersResponse = new CharactersResponse();
            charactersResponse.characters= characters;
            charactersResponse.offset = json.data.offset;
            charactersResponse.limit = json.data.limit;
            charactersResponse.total = json.data.total;
            resolve(charactersResponse);
            hideLoader()

        }).catch((error) => {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
};

// ------------------FETCH CHARACTERS BY ID-------------------------

const fetchCharacterById = (id:number) => {
    showLoader()
    const urlApi = `${getApiBaseUrl('characters/' + id)}`;
    let promise = new Promise(function(resolve, reject) {
        fetch(urlApi)
        .then(res => res.json())
        .then( (json) => {
            let item = json.data.results[0];
            let character = new Character();
            character.id = item.id;
            character.name = item.name;
            character.description = item.description;
            character.thumbnailUrl = `${item.thumbnail.path}.${item.thumbnail.extension}`;
            resolve(character);
            hideLoader()
        }).catch((error) => {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
}

// ------------------FETCH COMICS BY CHARACTERS-------------------------

const fetchComicsByCharacter = (characterId:number, offset:number, limit:number) => {
    showLoader()
    const urlApi = `${getApiBaseUrl(`characters/${characterId}/comics`)}&offset=${offset}&limit=${limit}`;
    let promise = new Promise(function(resolve, reject) {
        fetch(urlApi)
        .then(res => res.json())
        .then( (json) => {
            const comics = [];
            for(const item of json.data.results){
                let comic = new Comic();
                comic.id = item.id;
                comic.title = item.title;
                comic.thumbnailUrl = `${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`;
                comics.push(comic);
            }
            const comicsResponse = new ComicsResponse();
            comicsResponse.comics = comics ;
            comicsResponse.offset = json.data.offset;
            comicsResponse.limit = json.data.limit;
            comicsResponse.total = json.data.total;
            resolve(comicsResponse);
            hideLoader()

        }).catch((error) => {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
}

// ------------------ COMICS -------------------------

// ------------------FETCH COMICS-------------------------

const fetchComics = (offset:number, limit:number, titleStartsWith:string, orderBy:string) => {
    showLoader()
    let urlApi = `${getApiBaseUrl('comics')}&offset=${offset}&limit=${limit}`;
    if(titleStartsWith != undefined && titleStartsWith != ''){
        urlApi += `&titleStartsWith=${titleStartsWith}`;
    }
    if(orderBy != undefined){
        urlApi += `&orderBy=${orderBy}`;
    }
    let promise = new Promise(function(resolve, reject) {
        fetch(urlApi)
        .then(res => res.json())
        .then( (json) => {
            const comics = [];
            for(const itemComic of json.data.results){
                let comic = new Comic();
                comic.id = itemComic.id;
                comic.title = itemComic.title;
                comic.thumbnailUrl = `${itemComic.thumbnail.path}/portrait_uncanny.${itemComic.thumbnail.extension}`;
                comic.modified = new Date(itemComic.modified);
                comics.push(comic);
            }
            const comicsResponse = new ComicsResponse();
            comicsResponse.comics = comics;
            comicsResponse.offset = json.data.offset;
            comicsResponse.limit = json.data.limit;
            comicsResponse.total = json.data.total;
            resolve(comicsResponse);
            hideLoader()

        }).catch((error) => {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
};

// ------------------FETCH COMICS BY ID-------------------------

const fetchComicById = (id:number) => {
    showLoader()
    const urlApi = `${getApiBaseUrl('comics/' + id)}`;
    let promise = new Promise(function(resolve, reject) {
        fetch(urlApi)
        .then(res => res.json())
        .then((json) => {
            let item = json.data.results[0];
            let comic = new Comic();
            let creators = [];
            comic.id = item.id;
            comic.title = item.title;
            comic.thumbnailUrl = `${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`;
            comic.modified = new Date(item.modified);
            for(const creator of item.creators.items){
                creators.push(creator.name);
            }
            comic.creators = creators;
            resolve(comic);
            hideLoader()
        }).catch((error) => {
            reject('Hubo un problema con la petición Fetch:' + error.message);  
        });
    });
    return promise;
};

// ------------------FETCH CHARACTERS BY COMICS-------------------------

const fetchCharactersByComic = (comicId:number, offset:number, limit:number) => {
    showLoader()
    const urlApi = `${getApiBaseUrl(`comics/${comicId}/characters`)}&offset=${offset}&limit=${limit}`;
    let promise = new Promise(function(resolve, reject) {
        fetch(urlApi)
        .then(res => res.json())
        .then( (json) => {
            const characters = [];
            for(const item of json.data.results){
                let character = new Character();
                character.id = item.id;
                character.name = item.name;
                character.thumbnailUrl = `${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`;
                characters.push(character);
            }
            const charactersResponse = new CharactersResponse();
            charactersResponse.characters = characters;
            charactersResponse.offset = json.data.offset;
            charactersResponse.limit = json.data.limit;
            charactersResponse.total = json.data.total;
            resolve(charactersResponse);
            hideLoader()

        }).catch((error) => {
            reject('Hubo un problema con la petición Fetch:' + error.message);
        });
    });
    return promise;
};

