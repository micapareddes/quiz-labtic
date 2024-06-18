const formulario = document.querySelector("#login-form");
const inputUser = document.querySelector("#user");
const inputSenha = document.querySelector("#senha");
const submitButton = document.querySelector("#submit-button");
const eyeButton = document.querySelector("#eye-button");
const containerSenha = document.querySelector("#container-senha");
const inputSenhaContainer = document.querySelector("#input-senha-container");
const eyeIcon = document.querySelector("#eye-icon");
const eyeSlashIcon = document.querySelector("#eye-slash-icon");

function createErrorMessage(message) {
    const errorMessage = document.querySelector("#error-message");
    
    if (errorMessage) {
        errorMessage.textContent = message
    } else {
        const errorMessageSpan = createHTMLElement('span')
        errorMessageSpan.id = 'error-message'
        errorMessageSpan.textContent = message
        errorMessageSpan.className = 'text-sm text-red-500'
        containerSenha.appendChild(errorMessageSpan)
    }
}

function removeErrorMessage() {
    const errorMessage = document.querySelector("#error-message");

    if (errorMessage) {
        errorMessage.remove()
    }

    inputUser.classList.remove('border-red-500')
    inputSenhaContainer.classList.remove('border-red-500')
}

function highlightInputBorderWithRed() {
    inputUser.classList.add('border-red-500')
    inputSenhaContainer.classList.add('border-red-500')
}

function emptyLoginInputs() {
    inputSenha.value = ''
    inputUser.value = ''
}

function checkFilledInputs() {
    let inputsFilled = inputSenha.value.trim() !== '' && inputUser.value.trim() !== ''

    if (inputsFilled) {
        removeErrorMessage()
        submitButton.disabled = false
    }
}

function checkEmptyInputs(userData) {
    let emptyInputs
    
    if (userData.email) {
        emptyInputs = userData.email.trim() === '' || userData.senha.trim() === ''
    } else {
        emptyInputs = userData.matricula.trim() === '' || userData.senha.trim() === ''
    }

    if (emptyInputs) {
        highlightInputBorderWithRed()
        createErrorMessage('Todos os campos devem ser preenchidos!')

        submitButton.disabled = true
        return true
    }
    return false
}

function togglePasswordView(event) {
    event.preventDefault()

    if (inputSenha.type === 'password') {
        inputSenha.type = 'text'
        eyeIcon.classList = 'hidden'
        eyeSlashIcon.classList = 'block'
    } else {
        inputSenha.type = 'password'
        eyeIcon.classList = 'block'
        eyeSlashIcon.classList = 'hidden'
    }
}

async function reqLogin(userData) {
    try {
        const url = 'http://localhost:3333/api/usuarios/login'
        const { accessToken } = await makeRequest({ url, method: 'POST', data: userData })

        localStorage.setItem('accessToken', accessToken)

        return true

    } catch (error) {
        console.log('erro!', error);
        if (error.status === 401) {
            highlightInputBorderWithRed()
            const errorMessage = document.querySelector("#error-message")
            if (!errorMessage) {
                createErrorMessage('Senha ou usuario inválidos!')
            } else {
                errorMessage.textContent = 'Senha ou usuario inválidos!'
            }
        } else {
            emptyLoginInputs()
            alert('Algo deu errado, por favor tente novamente.')
        }

        return false
    }
}

eyeButton.addEventListener("click", (event) => togglePasswordView(event))

inputSenha.addEventListener("input", checkFilledInputs)
inputUser.addEventListener("input", checkFilledInputs)

formulario.addEventListener("submit", async (event) => {
    event.preventDefault()

    let userData

    if (event.target.user.value.includes('@')) {
        userData = {
            email: event.target.user.value,
            senha: event.target.senha.value
        }
    } else {
        userData = {
            matricula: event.target.user.value,
            senha: event.target.senha.value
        }
    }
    
    const emptyInputs = checkEmptyInputs(userData)
    
    if (!emptyInputs) {
        const success = await reqLogin(userData)
        if (success) {
            window.location.href = 'http://localhost:5500/frontend/src/pages/dashboard.html'
        }
       
    }
})

document.addEventListener('DOMContentLoaded', (event) => {
    const success = getFromLocalStorage('success')
    if (success) {
        window.location.href = 'http://localhost:5500/frontend/src/pages/dashboard.html'
    }
})