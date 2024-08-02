// Functions
import { verifyUserAccess } from '/frontend/src/js/auth/verifyUserAccess.js'
import { getProfessores } from '/frontend/src/js/pages/admin/cadastro/disciplinas/service/getProfessores.js'
import { parseProfessores } from '/frontend/src/js/pages/admin/cadastro/disciplinas/functions/parseProfessores.js'
import { cadastroDisciplinaValidation } from '/frontend/src/js/validations/cadastroDisciplinaValidation.js'
import { cadastrarDisciplina } from '/frontend/src/js/pages/admin/cadastro/disciplinas/service/cadastrarDisciplina.js'

// Components
import { Heading } from '/frontend/src/js/components/heading.js'
import { SidebarAdmin } from '/frontend/src/js/pages/admin/components/sidebar-admin.js'
import { Button } from '/frontend/src/js/components/button.js'
import { TextInput } from '/frontend/src/js/components/text-input.js'
import { Select } from '/frontend/src/js/components/select.js'
import { SuccessToaster, openToaster, closeToaster } from '/frontend/src/js/components/toaster.js'
import { ErrorMessage } from '/frontend/src/js/pages/login/components/error-message.js' //TODO: colocar em components de admin


async function handleSubmit(event) {
    event.preventDefault()

    const form = event.target
    const select = form.querySelector('select')
    const input = form.querySelector('input')
    const inputsContainer = form.querySelector('#name-container')
    const submitButton = form.querySelector('#submit')
    const professor_id = select.value
    const nomeDisciplina = input.value
    const data = {
        'nome': nomeDisciplina,
        'professor_id': professor_id,
    }

    const { success } = cadastroDisciplinaValidation(nomeDisciplina)

    if (!success) {
        input.classList.add('border-red-500')
        inputsContainer.appendChild(
            ErrorMessage('O nome deve conter pelo menos 3 caracteres')
        )
        submitButton.disabled = true
        return
    }

    try {
        await cadastrarDisciplina(data)
        form.reset()
        select.selectedIndex = 0
        openToaster(
            SuccessToaster({
                message: `Disciplina "${nomeDisciplina}" cadastrada!`
            })
        )
        closeToaster()
        
    } catch (error) {
        if (error.status === 2409) {
            input.classList.add('border-red-500')
            inputsContainer.appendChild(
                ErrorMessage('Disciplina já cadastrada!')
            )
            submitButton.disabled = true
        } else {
            alert('Algo deu errado...')
        }
    }
}

function handleChange(event) {
    const form = event.target.form
    const input = form.querySelector('#name')
    const submitButton = form.querySelector('#submit')
    const errorMessage = form.querySelector('#error-message')
    if (errorMessage) {
        errorMessage.remove()
        input.classList.remove('border-red-500')
        submitButton.disabled = false
    }
}

async function CadastroDisciplinaPage() {
    verifyUserAccess('admin')
    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const form = document.createElement('form')
    const inputsContainer = document.createElement('div')
    const buttonContainer = document.createElement('div')
    const professores = await getProfessores()
    const professoresFormatados = parseProfessores(professores)

    inputsContainer.className = 'grid grid-cols-2 gap-8 items-start mt-10'
    buttonContainer.className = 'mt-auto text-center'
    form.className = 'h-full grid'

    root.prepend(SidebarAdmin())
    inputsContainer.append(
        TextInput({
            id: 'name', 
            labelName: 'Nome',
            placeholder: 'Nome da Disciplina' 
        }),
        Select({
            id: 'professor',
            labelName: 'Professor',
            placeholder: 'Selecione um professor',
            emptyOption: 'Nenhum professor',
            options: professoresFormatados,
            tooltip: true,
            tooltipMessage: 'Devem existir professores cadastrados para adicionar na disciplina, logo o campo é opcional.'
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
            title: 'Cadastro da Disciplina', 
        }),
        form
    )

    form.onsubmit = handleSubmit
    form.oninput = handleChange
}
CadastroDisciplinaPage()