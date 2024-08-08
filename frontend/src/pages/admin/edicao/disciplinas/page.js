// Functions
import { verifyUserAccess } from '/frontend/src/js/auth/verifyUserAccess.js'
import { getProfessores } from '/frontend/src/js/pages/admin/cadastro/disciplinas/service/getProfessores.js'
import { parseProfessores } from '/frontend/src/js/pages/admin/cadastro/disciplinas/functions/parseProfessores.js'
import { getDisciplina } from '/frontend/src/js/pages/admin/edicao/disciplinas/service/getDisciplina.js'
import { getUrlParam } from '/frontend/src/js/pages/admin/edicao/disciplinas/functions/getUrlParam.js'
import { navigateTo } from '/frontend/src/js/functions/navigateTo.js'
import { obtainValuesFromStorage } from '/frontend/src/js/pages/admin/edicao/disciplinas/functions/obtainValuesFromStorage.js'
import { deleteValuesFromStorage } from '/frontend/src/js/pages/admin/edicao/disciplinas/functions/deleteValuesFromStorage.js'
import { saveOriginalValues } from '/frontend/src/js/pages/admin/edicao/disciplinas/functions/saveOriginalValues.js'
import { alterarDisciplinaNoBanco } from '/frontend/src/js/pages/admin/edicao/disciplinas/service/alterarDisciplinaNoBanco.js'
import { cadastroDisciplinaValidation } from '/frontend/src/js/validations/cadastroDisciplinaValidation.js'

// Components
import { Heading } from '/frontend/src/js/components/heading.js'
import { SidebarAdmin } from '/frontend/src/js/pages/admin/components/sidebar-admin.js'
import { Button } from '/frontend/src/js/components/button.js'
import { TextInput } from '/frontend/src/js/components/text-input.js'
import { Select } from '/frontend/src/js/components/select.js'
import { InfoToaster, openToaster, closeToaster } from '/frontend/src/js/components/toaster.js'
import { ErrorMessage } from '/frontend/src/js/pages/login/components/error-message.js' //TODO: colocar em components de admin

async function handleSubmit(e) {
    e.preventDefault()

    const form = e.target
    const inputContainer = form.querySelector('#name-container')
    const input = form.querySelector('input')
    const select = form.querySelector('select')
    const submitButton = form.querySelector('#submit')
    const savedData = obtainValuesFromStorage()

    let editedData = {
        nome: input.value.trim(),
        professor_id: !select.value.trim() ? 'null' : select.value.trim()
    }

    const { success } = cadastroDisciplinaValidation(editedData.nome)
    if (!success) {
        input.classList.add('border-red-500')
        inputContainer.appendChild(
            ErrorMessage('O nome deve conter pelo menos 3 caracteres')
        )
        submitButton.disabled = true
        return
    }

    const formMudou = savedData.nome !== editedData.nome  || savedData.professor_id !== editedData.professor_id

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
        await alterarDisciplinaNoBanco(editedData)
        deleteValuesFromStorage()
        localStorage.setItem('disciplinaAlterada', editedData.nome)
        navigateTo('disciplinas.html') 
    } catch (error) {
        if (error.status === 403) {
            alert('Acesso Proibido')
            localStorage.removeItem('accessToken')
            navigateTo('/frontend/src/pages/login.html')
        } else {
            console.log(error);
            alert('Algo deu errado, tente novamente mais tarde...')
        }
    }
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
        navigateTo('/frontend/src/pages/adm/painel/disciplinas.html')
        return
    }

    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const form = document.createElement('form')
    const inputsContainer = document.createElement('div')
    const buttonContainer = document.createElement('div')
    const professores = await getProfessores()
    const professoresFormatados = parseProfessores(professores)
    const { nome, professor_id } = await getDisciplina()

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
            title: 'Salvar alterações',
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
 
    // Mostra em form nome da disciplina e professor
    const input =  form.querySelector('input')
    const select = form.querySelector('select')
    input.value = nome
    select.value = String(professor_id)

    saveOriginalValues({
        nome,
        professorId: professor_id
    })

    form.onsubmit = handleSubmit
    form.oninput = handleChange
}
EdicaoCadastroPage()