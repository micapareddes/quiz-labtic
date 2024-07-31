export function AuthFormContent() {
    const container = document.createElement('div')
    const credentialsInput = TextInput({
        id: 'credentials',
        labelName: 'Matricula ou Email',
        placeholder: 'usuario@email.com',
        size: 'regular',
        fill: true,
    })
    const password = PasswordInput({})
    const forgotPasswordButtonContainer = document.createElement('div')
    const forgotPasswordButton = Button({
        link: '/recuperar-senha',
        variant: 'ghost',
        title: 'Esqueceu a senha ou deseja trocar?',
        size: 'regular',
    })
    container.className = 'flex flex-col gap-8 w-full'
    forgotPasswordButtonContainer.className = 'flex justify-center'
    forgotPasswordButtonContainer.appendChild(forgotPasswordButton)
    container.append(credentialsInput, password, forgotPasswordButtonContainer)

    return container
}