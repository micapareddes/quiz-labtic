function createHTMLElement(type) {
    return document.createElement(type)
}

function navigateTo(url) {
    window.location.href = url
}

async function makeRequest({ url, method, token = null, data = null } ) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        }
    }
    if (data) {
        options.body = JSON.stringify(data)
    }

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url, options)

    if (!response.ok) {
        console.log('response not ok');
        throw { status: response.status, message: 'HTTP error!' };
    }

    return response.json()
}

function getFromLocalStorage(item) {
    return localStorage.getItem(item)
}