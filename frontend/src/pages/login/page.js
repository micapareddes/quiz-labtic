import { checkAndRedirectUser } from '/frontend/src/auth/checkAndRedirectUser.js'
import { loginFormValidation } from '/frontend/src/validations/loginFormValidation.js'
import { reqLogin } from '/frontend/src/pages/login/service/login.js'

import { LoginForm } from '/frontend/src/pages/login/components/login-form.js'
import { ErrorMessage } from '/frontend/src/pages/login/components/error-message.js'

export async function handleSubmit(event) {
    event.preventDefault()

    const form = event.target
    const inputCredentials = form.credentials
    const inputPassword = form.password
    const passwordContainer = form.querySelector('#password-container')
    const fieldPassword = form.querySelector('#field-password')
    const submitButton = form.querySelector('#submit')

    let userData

    if (inputCredentials.value.includes('@')) {
        userData = {
            email: inputCredentials.value,
            senha: inputPassword.value
        }
    } else {
        userData = {
            matricula: inputCredentials.value,
            senha: inputPassword.value
        }
    }

    const {success} = loginFormValidation(userData)

    if (!success) {
        inputCredentials.classList.add('border-red-500')
        passwordContainer.classList.add('border-red-500')

        fieldPassword.appendChild(
            ErrorMessage('Todos os campos devem ser preenchidos!')
        )

        submitButton.disabled = true

        return 
    }

    try {
        await reqLogin(userData)
    } catch (error) {
        if (error.status === 1401) {
            inputCredentials.classList.add('border-red-500')
            passwordContainer.classList.add('border-red-500')
            fieldPassword.appendChild(
                ErrorMessage('Senha ou usuario inválidos!')
            )
            submitButton.disabled = true

            return
        }
        alert('Ocorreu um erro inesperado, tente novamente mais tarde.')
    }
}

function PageLogin() {
    checkAndRedirectUser()
    const main = document.getElementById('main')
    const formContainer = LoginForm()
    const form = formContainer.querySelector('form')

    form.onsubmit = handleSubmit

    main.appendChild(formContainer)
}

PageLogin()