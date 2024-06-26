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
        const json = await response.json()
        console.log(json);
        throw { status: json.code, message: json.message };
    }
    
    if (response.status === 204) return 
    
    return response.json()
}

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

function redirectTo404() {
    window.location.href = 'http://localhost:5500/frontend/src/pages/404.html'
}

async function reqUserType() {
    const url = 'http://localhost:3333/api/usuarios/me'
    const token = getFromLocalStorage('accessToken')
    return await makeRequest({ url, method: 'GET', token: token })
}

async function verifyUserAccess(tipo) {
    const { userType } = await reqUserType()

    if (userType !== tipo) {
        redirectTo404()
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

function getFromLocalStorage(item) {
    return localStorage.getItem(item)
}

function mostrarNomeUsuario(nome) {
    const htmlSpanNome = document.getElementById('nome-user')
    htmlSpanNome.textContent = nome
}