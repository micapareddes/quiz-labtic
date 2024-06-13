const formulario = document.querySelector("#login-form");
const inputUser = document.querySelector("#user");
const inputSenha = document.querySelector("#senha");
const submitButton = document.querySelector("#submit-button");
const eyeButton = document.querySelector("#eye-button");
const containerSenha = document.querySelector("#container-senha");
const inputSenhaContainer = document.querySelector("#input-senha-container");
const eyeIcon = document.querySelector("#eye-icon");
const eyeSlashIcon = document.querySelector("#eye-slash-icon");

async function reqLogin(userData) {
    try {
        const response = await fetch('http://localhost:3333/api/usuarios/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })

        if (!response.ok) {
            const erro = await response.json()
            if (erro.code == 1401) {
                inputUser.classList.add('border-red-500')
                inputSenhaContainer.classList.add('border-red-500')

                if (!document.querySelector("#error-message")) {
                    const errorMessageSpan = createHTMLElement('span')
                    errorMessageSpan.id = 'error-message'
                    errorMessageSpan.textContent = 'Senha ou usuario inválidos!'
                    errorMessageSpan.className = 'text-sm text-red-500'
                    containerSenha.appendChild(errorMessageSpan)
                }

                return false
            } else {
                inputSenha.value = ''
                inputUser.value = ''
                alert('Algo deu errado, por favor tente novamente.')
                return false
            }
        }

        const { accessToken } = await response.json()

        console.log(accessToken)

        localStorage.setItem('accessToken', accessToken)

        return true

    } catch (error) {
        console.log('Erro:', error)
        return false
    }
}

function checkFillInputs() {
    const fillInputs = inputSenha.value.trim() !== '' && inputUser.value.trim() !== ''

    if (fillInputs) {
        const errorMessage = document.querySelector("#error-message");
        if (errorMessage) {
            errorMessage.remove()
        }

        inputUser.classList.remove('border-red-500')
        inputSenhaContainer.classList.remove('border-red-500')

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
        console.log('input vazio!')
        inputUser.classList.add('border-red-500')
        inputSenhaContainer.classList.add('border-red-500')

        const errorMessageSpan = createHTMLElement('span')
        errorMessageSpan.id = 'error-message'
        errorMessageSpan.textContent = 'Todos os campos devem ser preenchidos!'
        errorMessageSpan.className = 'text-sm text-red-500'

        containerSenha.appendChild(errorMessageSpan)

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

eyeButton.addEventListener("click", (event) => togglePasswordView(event))

inputSenha.addEventListener("input", checkFillInputs)
inputUser.addEventListener("input", checkFillInputs)

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
        if (await reqLogin(userData)) {
            console.log('entrou');
            window.location.href = 'http://localhost:5500/frontend/src/pages/dashboard.html'
        }
       
    }
})

document.addEventListener('DOMContentLoaded', (event) => {
    const accessToken = getAccessTokenFromLocalStorage()
    if (accessToken) {
        window.location.href = 'http://localhost:5500/frontend/src/pages/dashboard.html'
    }
})