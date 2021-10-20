// ------------------VARIABLES-------------------------
var params = new URLSearchParams(window.location.search);
var orderSelect = document.getElementById('order-select');
// ------------------ LOADER -------------------------
var contenedor = document.getElementById('loader-container');
var hideLoader = function () {
    contenedor.classList.add('hidden');
    console.log('hide');
};
var showLoader = function () {
    contenedor.classList.remove('hidden');
    console.log('show');
};
// ------------------ ASSEMBLE CARD -------------------------
var getCellHTML = function (classCard, url, thumbnailUrl, alt, title) {
    var cellHTML = "<div class=\"" + classCard + "\"><a href=\"" + url + "\"><img src=\"" + thumbnailUrl + "\" alt=\"" + alt + "\"></a><h3>" + title + "</h3></div>";
    return cellHTML;
};
// ------------------PAGINATION-------------------------
var getPageLi = function (page, content, baseUrl) {
    params.set("page", page);
    var li = "<li><a href=\"" + baseUrl + "?" + params + "\">" + content + "</a></li>";
    return li;
};
var displayPaged = function (total, limit, page, baseUrl) {
    var qtyPages = Math.ceil(total / limit);
    var pagesList = document.getElementById('pages');
    var currentPage = page == undefined ? 1 : parseInt(page);
    var listContent = '';
    if (qtyPages === 0) {
        pagesList.innerHTML = '';
        return;
    }
    if (currentPage != 1) {
        var back = getPageLi(currentPage - 1, "<", baseUrl);
        listContent += back;
        var first = getPageLi(1, "1", baseUrl);
        listContent += first;
    }
    if (currentPage - 3 > 1) {
        var dots = "<li><span>...</span></li>";
        listContent += dots;
    }
    if (currentPage - 2 > 1) {
        var prev_2 = getPageLi(currentPage - 2, "" + (currentPage - 2), baseUrl);
        listContent += prev_2;
    }
    if (currentPage - 1 > 1) {
        var prev_1 = getPageLi(currentPage - 1, "" + (currentPage - 1), baseUrl);
        listContent += prev_1;
    }
    var current = getPageLi(currentPage, "" + currentPage, baseUrl);
    listContent += current;
    if (currentPage + 1 < qtyPages) {
        var next_1 = getPageLi(currentPage + 1, "" + (currentPage + 1), baseUrl);
        listContent += next_1;
    }
    if (currentPage + 2 < qtyPages) {
        var next_2 = getPageLi(currentPage + 2, "" + (currentPage + 2), baseUrl);
        listContent += next_2;
    }
    if (currentPage + 3 < qtyPages) {
        var dots = "<li><span>...</span></li>";
        listContent += dots;
    }
    if (currentPage != qtyPages) {
        var last = getPageLi(qtyPages, "" + qtyPages, baseUrl);
        listContent += last;
        var next = getPageLi(currentPage + 1, ">", baseUrl);
        listContent += next;
    }
    pagesList.innerHTML = listContent;
};
// ------------------DISPLAY SELECT ORDER BY-------------------------
var buildOrderBySelectByType = function (type) {
    if (type === 'comics') {
        orderSelect.innerHTML = '';
        var opAz = document.createElement('option');
        opAz.appendChild(document.createTextNode('A-Z'));
        opAz.setAttribute('value', 'title');
        orderSelect.appendChild(opAz);
        var opZa = document.createElement('option');
        opZa.appendChild(document.createTextNode('Z-A'));
        opZa.setAttribute('value', '-title');
        orderSelect.appendChild(opZa);
        var opNewer = document.createElement('option');
        opNewer.appendChild(document.createTextNode('Más nuevos'));
        opNewer.setAttribute('value', '-focDate');
        orderSelect.appendChild(opNewer);
        var opOlder = document.createElement('option');
        opOlder.appendChild(document.createTextNode('Más viejos'));
        opOlder.setAttribute('value', 'focDate');
        orderSelect.appendChild(opOlder);
    }
    if (type === 'characters') {
        orderSelect.innerHTML = '';
        var opAz = document.createElement('option');
        opAz.appendChild(document.createTextNode('A-Z'));
        opAz.setAttribute('value', 'name');
        orderSelect.appendChild(opAz);
        var opZa = document.createElement('option');
        opZa.appendChild(document.createTextNode('Z-A'));
        opZa.setAttribute('value', '-name');
        orderSelect.appendChild(opZa);
    }
};
var messageError = function (message) {
    var alertHtml = "\n    <div class=\"alert alert-dark\" role=\"alert\">\n        <h4 class=\"alert-heading\">Ups!</h4>\n        <p>" + message + "</p>\n    </div>\n    ";
    return alertHtml;
};
