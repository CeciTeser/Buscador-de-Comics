const backButton = document.getElementById('back-button');
const containerDetailCard = document.getElementById('container-detail-card');
let contentDetailCard =''

const fetchComicById = (id) => {
    const urlApi = `${getApiBaseUrl('comics/' + id)}`;
    let promise = new Promise(function(resolve, reject) {
        fetch(urlApi)
        .then(res => res.json())
        .then((json) => {
            let item = json.data.results[0];
            let comic = new Comic();
            comic.id = item.id
            let creators = []

            for(const creator of item.creators.items){
                creators.push(creator.name);
            }
            contentDetailCard +=`
            <div class="cardDetail">
                <h3>${comic.title = item.title}<h3>
                <div class="img-text-display">
                    <a href="${item}">
                    <img src="${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}" alt="${item.title}">
                    </a>
                    <div class="text-display">
                        <p> <span>Modificado:</span> ${comic.modified = item.modified}<p>
                        <p> <span>Descripción:</span> ${comic.description = item.description}<p>
                        <p> <span>Creadores:</span> ${comic.creators = creators}<p>
                    </div>
                </div>
            </div>`;

            containerDetailCard.innerHTML=contentDetailCard 
            resolve(comic); 

        }).catch((error) => {
            reject('Hubo un problema con la petición Fetch:' + error.message);  
        });
    });
    return promise;
};

fetchComicById(3898).then(
        resolve = (comic) => {

            console.log(comic);
        },
        reject  = (error) => {
            console.log(error);
        }
    )



const goBackHome =() => {

    window.location.href='../index.html';
}

backButton.addEventListener('click', goBackHome);
