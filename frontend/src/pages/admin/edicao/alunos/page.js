// Functions
import { ROUTES } from '/frontend/src/utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { getUrlParam } from '/frontend/src/pages/admin/edicao/functions/getUrlParam.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { getDisciplinas } from '/frontend/src/pages/admin/service/getDisciplinas.js'
import { getAluno } from './service/getAluno.js'
import { removeOriginalValuesFromStorage } from '/frontend/src/pages/admin/edicao/functions/removeOriginalValuesFromStorage.js'
import { saveOriginalValues } from '/frontend/src/pages/admin/edicao/functions/saveOriginalValues.js'
import { obtainOriginalValuesFromStorage } from '/frontend/src/pages/admin/edicao/functions/obtainOriginalValuesFromStorage.js'
import { alterarDisciplinaNoBanco } from '/frontend/src/pages/admin/edicao/disciplinas/service/alterarDisciplinaNoBanco.js'
import { cadastroUserValidation } from '/frontend/src/validations/cadastroUserValidation.js'
import { goBack } from '/frontend/src/functions/goBack.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { SidebarAdmin } from '/frontend/src/pages/admin/components/sidebar-admin.js'
import { Button } from '/frontend/src/components/button.js'
import { TextInput } from '/frontend/src/components/text-input.js'
import { MultiSelect } from '/frontend/src/components/multi-select.js'
import { InfoToaster, openToaster, closeToaster } from '/frontend/src/components/toaster.js'
import { ErrorMessage } from '/frontend/src/pages/login/components/error-message.js' //TODO: colocar em components de admin

async function handleSubmit(e) {
    e.preventDefault()

    const form = e.target
    const nameInput = form.querySelector('#name')
    const matriculaInput = form.querySelector('#matricula')
    const emailInput = form.querySelector('#email')
    const nameInputContainer = form.querySelector('#name-container')
    const matriculaInputContainer = form.querySelector('#matricula-container')
    const emailInputContainer = form.querySelector('#email-container')
    const submitButton = form.querySelector('#submit')
    const { nome, email, matricula } = obtainOriginalValuesFromStorage()

    let editedData = {
        nome: nameInput.value.trim(),
        matricula: matriculaInput.value.trim(),
        email: emailInput.value.trim(),
    }

    const { success, error } = cadastroUserValidation(editedData)

    if (!success) {
        if (error.emailValidation) {
            emailInput.classList.add('border-red-500')
            emailInputContainer.appendChild(
                ErrorMessage('Formato de email inválido.')
            )
        }
        if (error.matriculaValidation) {
            matriculaInput.classList.add('border-red-500')
            matriculaInputContainer.appendChild(
                ErrorMessage('Matricula deve ter extamanete 6 números.')
            )
        }
        if (error.nameValidation) {
            nameInput.classList.add('border-red-500')
            nameInputContainer.appendChild(
                ErrorMessage('O nome deve conter pelo menos 3 caracteres.')
            )
        }

        submitButton.disabled = true
        return
    }

    const formMudou = nome !== editedData.nome  || email !== editedData.email  || matricula !== editedData.matricula

    if (!formMudou) {
        openToaster(
            InfoToaster({
                message: 'Não foi feita nenhuma alteração para salvar.',
            })
        )
        closeToaster()

        return
    }

    // try {
    //     await alterarDisciplinaNoBanco(editedData)
    //     removeOriginalValuesFromStorage()
    //     localStorage.setItem('disciplinaAlterada', editedData.nome)
    //     navigateTo('disciplinas.html') 
    // } catch (error) {
    //     if (error.status === 403) {
    //         alert('Acesso Proibido')
    //         localStorage.removeItem('accessToken')
    //         navigateTo('/frontend/src/pages/login.html')
    //     } else {
    //         console.log(error);
    //         alert('Algo deu errado, tente novamente mais tarde...')
    //     }
    // }
}

function handleChange(event) {
    const form = event.target.form
    const input = form.querySelector('input')
    const submitButton = form.querySelector('#submit')
    const errorMessage = form.querySelector('#error-message')
    if (errorMessage) {
        errorMessage.remove()
        input.classList.remove('border-red-500')
        submitButton.disabled = false
    }
}

async function EdicaoCadastroPage() {
    verifyUserAccess('admin')
    if (!getUrlParam('id')) {
        navigateTo(ROUTES.ADMIN.PAINEL.ALUNOS)
        return
    }

    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const form = document.createElement('form')
    const inputsContainer = document.createElement('div')
    const buttonContainer = document.createElement('div')
    const disciplinas = await getDisciplinas()
    const { email, matricula, nome } = await getAluno()

    inputsContainer.className = 'grid md:grid-cols-2 gap-8 items-start mt-10'
    buttonContainer.className = 'mt-auto text-center'
    form.className = 'flex flex-col h-full'

    root.prepend(SidebarAdmin())
    inputsContainer.append(
        TextInput({
            id: 'name', 
            labelName: 'Nome',
            placeholder: 'Nome do aluno' 
        }),
        TextInput({
            id: 'matricula', 
            labelName: 'Matricula',
            placeholder: '000000' 
        }),
        TextInput({
            id: 'email', 
            labelName: 'Email',
            placeholder: 'email@email.com' 
        }),
        MultiSelect({
            labelName: 'Disciplinas',
            placeholder: 'Disciplinas do aluno',
            optionsArray: disciplinas,
            tooltip: 'Devem existir disciplinas cadastradas, logo o campo é opcional.'
        })
    )
    buttonContainer.appendChild(
        Button({
            id: 'submit',
            variant: 'primary',
            size: 'lg',
            title: 'Cadastrar',
            type: 'submit',
        })
    )
    form.append(inputsContainer, buttonContainer)
    main.append(    
        Heading({
            goBack: true, 
            title: 'Edição do Aluno', 
            onGoBack: () => {
                if (form.querySelector('input').value) {
                    openDialog(
                        AlertDialog({
                            message: 'O cadastro não será salvo.',
                            confirmarButtonName: 'Voltar',
                            onConfirm: () => goBack()
                        })
                    )
                    return
                }
                goBack()
            }
        }),
        form
    )

    const nameInput = form.querySelector('#name')
    const matriculaInput = form.querySelector('#matricula')
    const emailInput = form.querySelector('#email')
    nameInput.value = nome
    matriculaInput.value = matricula
    emailInput.value = email

    saveOriginalValues({
        nome,
        matricula,
        email,
    })

    form.onsubmit = handleSubmit
    form.oninput = handleChange
}
EdicaoCadastroPage()