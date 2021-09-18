const containerCards = document.querySelector('#container-cards');
let content = '';
const url1: string= `${getApiBaseUrl('comics')}`
const url2: string= `${getApiBaseUrl('characters')}`

const comicClass = "cards-comics";
const characterClass = "cards-characters";
const titleComic= "title";
const nameCharacter= "name";

const displayGridCard=(url:string, classCard:string, titleName )=>{
fetch(url)
    .then(res => res.json())
    .then((json)=>{
        console.log("json", json)
        for(const item of json.data.results){
            let url = item.urls[0].url;
            content += `
            <div class="${classCard}">
                <a href="${url}">
                    <img src="${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}" alt="${item.name}">
                </a>
                <h3>${item[titleName]}</h3>
            </div>`;
            const totalResults = document.getElementById('total-results');
            totalResults.innerHTML = `${json.data.total}`;
        }
        containerCards.innerHTML = content;

    })
};
displayGridCard(url1, comicClass, titleComic);
displayGridCard(url2, characterClass, nameCharacter);

