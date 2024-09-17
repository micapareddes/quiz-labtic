// Functions
import { API_ENDPOINTS, ROUTES } from '../../../../utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { getProfessores } from '/frontend/src/pages/admin/cadastro/disciplinas/service/getProfessores.js'
import { parseProfessores } from '/frontend/src/pages/admin/cadastro/disciplinas/functions/parseProfessores.js'
import { getDisciplina } from '/frontend/src/pages/admin/edicao/disciplinas/service/getDisciplina.js'
import { getUrlParam } from '/frontend/src/pages/admin/edicao/functions/getUrlParam.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { removeOriginalValuesFromStorage } from '/frontend/src/pages/admin/edicao/functions/removeOriginalValuesFromStorage.js'
import { saveOriginalValues } from '/frontend/src/pages/admin/edicao/functions/saveOriginalValues.js'
import { obtainOriginalValuesFromStorage } from '/frontend/src/pages/admin/edicao/functions/obtainOriginalValuesFromStorage.js'
import { cadastroDisciplinaValidation } from '/frontend/src/validations/cadastroDisciplinaValidation.js'
import { goBack } from '/frontend/src/functions/goBack.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { SidebarAdmin } from '/frontend/src/pages/admin/components/sidebar-admin.js'
import { Button } from '/frontend/src/components/button.js'
import { TextInput } from '/frontend/src/components/text-input.js'
import { Select } from '/frontend/src/components/select.js'
import { InfoToaster, openToaster, closeToaster } from '/frontend/src/components/toaster.js'
import { ErrorMessage } from '/frontend/src/components/error-message.js'

async function handleSubmit(e) {
    e.preventDefault()

    const form = e.target
    const inputContainer = form.querySelector('#name-container')
    const input = form.querySelector('input')
    const select = form.querySelector('select')
    const submitButton = form.querySelector('#submit')
    const { nome, professorId } = obtainOriginalValuesFromStorage()

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

    const formMudou = nome !== editedData.nome  || professorId !== editedData.professor_id

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
        const accessToken = localStorage.getItem('accessToken')
        const id = getUrlParam('id')
        await makeRequest({ 
            url: API_ENDPOINTS.PATCH_DISCIPLINA_BY_ID(id), 
            method:'PATCH', 
            data: editedData, 
            token: accessToken 
        })
        removeOriginalValuesFromStorage()
        localStorage.setItem('disciplinaAlterada', editedData.nome)
        navigateTo(ROUTES.ADMIN.PAINEL.DISCIPLINAS) 
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
        navigateTo(ROUTES.ADMIN.PAINEL.DISCIPLINAS)
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
            onGoBack: () => history.back(),
            title: 'Edição da Disciplina', 
        }),
        form
    )
 
    // Mostra em form nome da disciplina e professor
    const input =  form.querySelector('input')
    const select = form.querySelector('select')
    input.value = nome
    select.value = String(professor_id)

    saveOriginalValues({ nome, professorId: professor_id })

    form.onsubmit = handleSubmit
    form.oninput = handleChange
}
EdicaoCadastroPage()