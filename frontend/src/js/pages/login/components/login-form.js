import { AuthFormContent } from '/frontend/src/js/pages/login/components/auth-form-content.js'
import { AuthForm } from '/frontend/src/js/components/auth-form.js'

export function LoginForm() {
    const authFormContainer = document.createElement('div')
    authFormContainer.className = 'w-98 md:w-[527px]'
    authFormContainer.appendChild(
        AuthForm({
            title: 'Faça Login',
            cardContent: AuthFormContent(),
            buttonName: 'Entrar',
            buttonSize: 'lg',
        })
    )

    return authFormContainer
}