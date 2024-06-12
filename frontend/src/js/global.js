function createHTMLElement(type) {
    return document.createElement(type)
}

function getAccessTokenFromLocalStorage() {
    return localStorage.getItem('accessToken')
}