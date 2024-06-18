function createHTMLElement(type) {
    return document.createElement(type)
}

function openDialog(id) {
    const dialog = document.getElementById(id)
    dialog.classList.add('flex')
    dialog.classList.remove('hidden')
}

function closeDialog(id) {
    const dialog = document.getElementById(id)
    dialog.classList.remove('flex')
    dialog.classList.add('hidden')
}

function navigateTo(url) {
    window.location.href = url
}

function verificarPermissoesPagina(tipo) {
    const userType = getFromLocalStorage('type')

    if (userType !== tipo) {
        window.location.href = 'http://localhost:5500/frontend/src/pages/404.html'
    }
}

function redirectToUserDashboard(userType) {
    if (userType === 'aluno') {
        window.location.href = 'http://localhost:5500/frontend/src/pages/aluno/dashboard.html'
    } else if (userType === 'professor') {
        window.location.href = 'http://localhost:5500/frontend/src/pages/professor/dashboard.html'
    } else if (userType === 'admin') {
        window.location.href = 'http://localhost:5500/frontend/src/pages/adm/dashboard.html'
    }
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