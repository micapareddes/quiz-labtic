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