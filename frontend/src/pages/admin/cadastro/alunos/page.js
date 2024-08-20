// Functions
import { ROUTES } from '/frontend/src/utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { goBack } from '/frontend/src/functions/goBack.js'
import { cadastroUserValidation } from '../../../../validations/cadastroUserValidation.js'
import { cadastrarUser } from '../service/cadastrarUser.js'
import { getDisciplinas } from '../service/getDisciplinas.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { SidebarAdmin } from '/frontend/src/pages/admin/components/sidebar-admin.js'
import { Button } from '/frontend/src/components/button.js'
import { TextInput } from '/frontend/src/components/text-input.js'
import { SuccessToaster, ErrorToaster, openToaster, closeToaster } from '/frontend/src/components/toaster.js'
import { ErrorMessage } from '/frontend/src/pages/login/components/error-message.js' //TODO: colocar em components de admin
import { openDialog, AlertDialog } from '/frontend/src/components/dialog.js'
import { MultiSelect } from '../../../../components/multi-select.js'
import { cadastrarAlunoADisciplinas } from './service/cadastrarAlunoADisciplinas.js'


async function handleSubmit(event) {
    event.preventDefault()

    const form = event.target
    const multiselect = form.querySelector('#multiselect')
    const selectedDisciplinasOnContainer = multiselect.querySelectorAll('.selected-item')
    const selectedDisciplinas = multiselect.querySelectorAll('#option:checked')
    const nameInput = form.querySelector('#name')
    const matriculaInput = form.querySelector('#matricula')
    const emailInput = form.querySelector('#email')
    const nameInputContainer = form.querySelector('#name-container')
    const matriculaInputContainer = form.querySelector('#matricula-container')
    const emailInputContainer = form.querySelector('#email-container')
    const submitButton = form.querySelector('#submit')
    const selectedDisciplinasArray = Array.from(selectedDisciplinas)
    const data = {
        nome: nameInput.value,
        papel: 'aluno',
        email: emailInput.value,
        matricula: matriculaInput.value,
    }
    const disciplinasData = {
        matricula: data.matricula,
        disciplinas: selectedDisciplinasArray.map((disciplina) => {
            return {
                nome: disciplina.getAttribute('data-label'),
                id: disciplina.value,
            }
        })
    }
    
    const { success, error } = cadastroUserValidation(data)

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

    try {
        await cadastrarUser(data)
        await cadastrarAlunoADisciplinas(disciplinasData)
        form.reset()
        selectedDisciplinasOnContainer.forEach((selected) => selected.remove())
        openToaster(
            SuccessToaster({
                message: `Aluno "${data.nome}" cadastrado!`
            })
        )
        closeToaster()
        
    } catch (error) {
        if (error.status === 1409) { 
            openToaster(
                ErrorToaster({ message: 'Aluno já foi cadastrado!' })
            )
            closeToaster()
            
            submitButton.disabled = true
        } else {
            alert('Algo deu errado, tente novamente mais tarde...')
        }
    }
}

function handleChange(event) {
    const form = event.target.form
    const nameInput = form.querySelector('#name')
    const matriculaInput = form.querySelector('#matricula')
    const emailInput = form.querySelector('#email')
    const submitButton = form.querySelector('#submit')
    const errorMessage = form.querySelectorAll('#error-message')
    
    if (errorMessage) {
        nameInput.classList.remove('border-red-500')
        matriculaInput.classList.remove('border-red-500')
        emailInput.classList.remove('border-red-500')
        errorMessage.forEach((error) => error.remove())
        submitButton.disabled = false
    }
}

async function CadastroAlunoPage() {
    verifyUserAccess('admin')
    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const form = document.createElement('form')
    const inputsContainer = document.createElement('div')
    const buttonContainer = document.createElement('div')
    const disciplinas = await getDisciplinas()

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
            title: 'Cadastro do Aluno', 
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
    
    form.onsubmit = handleSubmit
    form.oninput = handleChange
}
CadastroAlunoPage()