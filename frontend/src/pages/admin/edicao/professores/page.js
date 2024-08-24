// Services and others
import { ROUTES } from '/frontend/src/utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { getDisciplinas } from '/frontend/src/pages/admin/service/getDisciplinas.js'
import { getProfessorWithDisciplinas } from './service/getProfessorWithDisciplinas.js'
import { editUser } from '../service/editUser.js'
import { cadastroUserValidation } from '/frontend/src/validations/cadastroUserValidation.js'
// Functions
import { getUrlParam } from '/frontend/src/pages/admin/edicao/functions/getUrlParam.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { saveOriginalValues } from '/frontend/src/pages/admin/edicao/functions/saveOriginalValues.js'
import { obtainOriginalValuesFromStorage } from '/frontend/src/pages/admin/edicao/functions/obtainOriginalValuesFromStorage.js'
import { removeOriginalValuesFromStorage } from '/frontend/src/pages/admin/edicao/functions/removeOriginalValuesFromStorage.js'
import { editProfessorOfDisciplinas } from './service/editProfessorOfDisciplinas.js'
import { goBack } from '/frontend/src/functions/goBack.js'
// Components
import { Heading } from '/frontend/src/components/heading.js'
import { SidebarAdmin } from '/frontend/src/pages/admin/components/sidebar-admin.js'
import { Button } from '/frontend/src/components/button.js'
import { TextInput } from '/frontend/src/components/text-input.js'
import { MultiSelect } from '/frontend/src/components/multi-select.js'
import { InfoToaster, ErrorToaster, openToaster, closeToaster } from '/frontend/src/components/toaster.js'
import { openDialog, AlertDialog } from '/frontend/src/components/dialog.js'
import { ErrorMessage } from '/frontend/src/components/error-message.js'

async function handleSubmit(e) {
    e.preventDefault()

    const form = e.target
    const multiselect = form.querySelector('#multiselect')
    const selectedDisciplinas = multiselect.querySelectorAll('#option:checked')
    const selectedDisciplinasArray = Array.from(selectedDisciplinas)
    const nameInput = form.querySelector('#name')
    const matriculaInput = form.querySelector('#matricula')
    const emailInput = form.querySelector('#email')
    const nameInputContainer = form.querySelector('#name-container')
    const matriculaInputContainer = form.querySelector('#matricula-container')
    const emailInputContainer = form.querySelector('#email-container')
    const submitButton = form.querySelector('#submit')
    const { nome, email, matricula, disciplinas } = obtainOriginalValuesFromStorage()
    const editedData = {
        nome: nameInput.value.trim(),
        matricula: matriculaInput.value.trim(),
        email: emailInput.value.trim(),
    }
    const editedDisciplinas = selectedDisciplinasArray.map((disciplina) => {
        return disciplina.value
    })
    
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

    const arraysSaoIguais = (a1, a2) => {
        if (a1.length !== a2.length) return false
        return a1.every(id => a2.some(obj2 => id === obj2.id))
    }
    const disciplinasMudaram = !arraysSaoIguais(editedDisciplinas, disciplinas)
    const dataMudou = nome !== editedData.nome  || email !== editedData.email  || matricula !== editedData.matricula
    const formMudou = dataMudou || disciplinasMudaram

    if (!formMudou) {
        openToaster(
            InfoToaster({
                message: 'Não foi feita nenhuma alteração para salvar.',
            })
        )
        closeToaster()

        return
    }

    try {
        if (dataMudou) await editUser(editedData)
        if (disciplinasMudaram) await editProfessorOfDisciplinas(editedDisciplinas)
        removeOriginalValuesFromStorage()
        localStorage.setItem('professorAlterado', editedData.nome)
        navigateTo(ROUTES.ADMIN.PAINEL.PROFESSORES) 
    } catch (error) {
        if (error.status === 403) {
            alert('Acesso Proibido')
            localStorage.removeItem('accessToken')
            navigateTo(ROUTES.LOGIN)
        } else if (error.status === 2410) { 
            openToaster(
                ErrorToaster({ message: error.message })
            )
            closeToaster()
            
            submitButton.disabled = true
        } else {
            console.log(error);
            alert('Algo deu errado, tente novamente mais tarde...')
        }
    }
}

function handleChange(event) { //TODO: reset error handler
    const form = event.target.form
    const input = form.querySelector('input')
    const submitButton = form.querySelector('#submit')
    const errorMessage = form.querySelector('#error-message')
    if (errorMessage) {
        errorMessage.remove()
        input.classList.remove('border-red-500')
    }
    submitButton.disabled = false
}

async function EdicaoCadastroPage() {
    verifyUserAccess('admin')
    if (!getUrlParam('id')) {
        navigateTo(ROUTES.ADMIN.PAINEL.PROFESSORES)
        return
    }

    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const form = document.createElement('form')
    const inputsContainer = document.createElement('div')
    const buttonContainer = document.createElement('div')
    const disciplinasCadastradas = await getDisciplinas()
    const { nome, matricula, email, disciplinas } = await getProfessorWithDisciplinas()
    const disciplinasIds = new Set(disciplinas.map(disciplina => disciplina.id))

    inputsContainer.className = 'grid md:grid-cols-2 gap-8 items-start mt-10'
    buttonContainer.className = 'mt-auto text-center'
    form.className = 'flex flex-col h-full'

    root.prepend(SidebarAdmin())
    inputsContainer.append(
        TextInput({
            id: 'name', 
            labelName: 'Nome',
            placeholder: 'Nome do professor' 
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
            placeholder: 'Disciplinas do professor',
            optionsArray: disciplinasCadastradas,
            tooltip: 'Devem existir disciplinas cadastradas, logo o campo é opcional.'
        })
    )
    buttonContainer.appendChild(
        Button({
            id: 'submit',
            variant: 'primary',
            size: 'lg',
            title: 'Salvar alterações',
            type: 'submit',
        })
    )
    form.append(inputsContainer, buttonContainer)
    main.append(    
        Heading({
            goBack: true, 
            title: 'Edição do Professor', 
            onGoBack: () => goBack() //TODO: adicionar lógica de "alterações não serão salvas"
        }),
        form
    )

    const nameInput = form.querySelector('#name')
    const matriculaInput = form.querySelector('#matricula')
    const emailInput = form.querySelector('#email')
    const multiselect = form.querySelector('#multiselect')
    const options = multiselect.querySelectorAll('#option')
    nameInput.value = nome
    matriculaInput.value = matricula
    emailInput.value = email
    options.forEach((option) => {
        if (disciplinasIds.has(option.value)) {
            option.checked = true
            const event = new Event('change', { bubbles: true })
            option.dispatchEvent(event)
        }
    })

    saveOriginalValues({
        nome,
        matricula,
        email,
        disciplinas,
    })

    form.onsubmit = handleSubmit
    form.oninput = handleChange
}
EdicaoCadastroPage()