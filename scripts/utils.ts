// ------------------VARIABLES-------------------------

const params = new URLSearchParams(window.location.search);
const orderSelect = document.getElementById('order-select');

// ------------------ LOADER -------------------------

let contenedor = document.getElementById('loader-container');

const hideLoader = () => {
    contenedor.classList.add('hidden')
    console.log('hide')
}

const showLoader = () => {
    contenedor.classList.remove('hidden')
    console.log('show')
}

// ------------------ ASSEMBLE CARD -------------------------
const getCellHTML = (classCard: string, url: string, thumbnailUrl: string, alt: string, title: string) => {
    const cellHTML = "<div class=\"" + classCard + "\"><a href=\"" + url + "\"><img src=\"" + thumbnailUrl + "\" alt=\"" + alt + "\"></a><h3>" + title + "</h3></div>";

    return cellHTML;
};

// ------------------PAGINATION-------------------------
const getPageLi = (page, content: string, baseUrl: string) => {
    params.set("page", page);
    const li = `<li><a href="${baseUrl}?${params}">${content}</a></li>`;
    return li;
}

const displayPaged = (total: number, limit: number, page, baseUrl: string) => {
    const qtyPages = Math.ceil(total / limit);
    const pagesList = document.getElementById('pages');
    const currentPage = page == undefined ? 1 : parseInt(page);
    let listContent = '';

    if (qtyPages === 0) {
        pagesList.innerHTML = '';
        return;
    }

    if (currentPage != 1) {
        const back = getPageLi(currentPage - 1, "<", baseUrl);
        listContent += back;
        const first = getPageLi(1, "1", baseUrl);
        listContent += first;
    }

    if (currentPage - 3 > 1) {
        const dots = `<li><span>...</span></li>`;
        listContent += dots;
    }

    if (currentPage - 2 > 1) {
        const prev_2 = getPageLi(currentPage - 2, `${currentPage - 2}`, baseUrl);
        listContent += prev_2;
    }

    if (currentPage - 1 > 1) {
        const prev_1 = getPageLi(currentPage - 1, `${currentPage - 1}`, baseUrl);
        listContent += prev_1;
    }

    const current = getPageLi(currentPage, `${currentPage}`, baseUrl);
    listContent += current;

    if (currentPage + 1 < qtyPages) {
        const next_1 = getPageLi(currentPage + 1, `${currentPage + 1}`, baseUrl);
        listContent += next_1;
    }

    if (currentPage + 2 < qtyPages) {
        const next_2 = getPageLi(currentPage + 2, `${currentPage + 2}`, baseUrl);
        listContent += next_2;
    }

    if (currentPage + 3 < qtyPages) {
        const dots = `<li><span>...</span></li>`;
        listContent += dots;
    }

    if (currentPage != qtyPages) {
        const last = getPageLi(qtyPages, `${qtyPages}`, baseUrl);
        listContent += last;
        const next = getPageLi(currentPage + 1, ">", baseUrl);
        listContent += next;
    }

    pagesList.innerHTML = listContent;
};


// ------------------DISPLAY SELECT ORDER BY-------------------------

const buildOrderBySelectByType = (type: string) => {
    if (type === 'comics') {
        orderSelect.innerHTML = '';
        const opAz = document.createElement('option');
        opAz.appendChild(document.createTextNode('A-Z'));
        opAz.setAttribute('value', 'title');
        orderSelect.appendChild(opAz);

        const opZa = document.createElement('option');
        opZa.appendChild(document.createTextNode('Z-A'));
        opZa.setAttribute('value', '-title')
        orderSelect.appendChild(opZa);

        const opNewer = document.createElement('option');
        opNewer.appendChild(document.createTextNode('Más nuevos'));
        opNewer.setAttribute('value', '-focDate');
        orderSelect.appendChild(opNewer);

        const opOlder = document.createElement('option');
        opOlder.appendChild(document.createTextNode('Más viejos'));
        opOlder.setAttribute('value', 'focDate');
        orderSelect.appendChild(opOlder);
    }

    if (type === 'characters') {
        orderSelect.innerHTML = '';

        const opAz = document.createElement('option');
        opAz.appendChild(document.createTextNode('A-Z'));
        opAz.setAttribute('value', 'name');
        orderSelect.appendChild(opAz);

        const opZa = document.createElement('option');
        opZa.appendChild(document.createTextNode('Z-A'));
        opZa.setAttribute('value', '-name');
        orderSelect.appendChild(opZa);
    }
};

const messageError = (message: string) => {
    const alertHtml = `
    <div class="alert alert-dark" role="alert">
        <h4 class="alert-heading">Ups!</h4>
        <p>${message}</p>
    </div>
    `;
    return alertHtml;
}

// ------------------MODE LIGHT/DARK-------------------------

const btnSwitch = document.getElementById('switch');
const btnIcon = document.getElementById('theme-icon');
const btnIconSun = document.getElementById('theme-icon-Sun');
const configWindow = window.matchMedia('(prefers-color-scheme: dark)');
const storage = localStorage.getItem('theme-dark-light');
const darkMode = document.getElementById('moonDark');
const lightMode = document.getElementById('sunLight');

if (storage === 'dark') {
    document.body.classList.toggle('dark-theme')
} else if (storage === 'light') {
    document.body.classList.toggle('light-theme')
}

btnSwitch.addEventListener('click', () => {
    let themeColor;
    if (configWindow.matches) {
        document.body.classList.toggle('light-theme')
        themeColor = document.body.classList.contains('light-theme') ? 'light' : 'dark'
    } else {
        document.body.classList.toggle('dark-theme')
        themeColor = document.body.classList.contains('dark-theme') ? 'dark' : 'light'
    }
    localStorage.setItem('theme-dark-light', themeColor)
})

btnSwitch.addEventListener('click', () =>{
    if(document.body.className == 'dark-theme'){
        btnIcon.classList.add('d-none');
        btnIconSun.classList.remove('d-none');

    } else{
        btnIconSun.classList.add('d-none');
        btnIcon.classList.remove('d-none');
    }
})


