const cadastroDisciplinaForm = document.getElementById('cadastro-form')
const goBackButton = document.getElementById('go-back')
const disciplinaInput = document.getElementById('disciplina')
const disciplinaContainer = document.getElementById('disciplina-container')
const dialogAlteracoesCancelarButton = document.getElementById('cancelar-dialog-button')
const dialogAlteracoesVoltarButton = document.getElementById('voltar-dialog-button')
const toaster = document.getElementById('toaster')
const main = document.getElementById('main')

async function cadastrar(data) {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        const url = 'http://localhost:3333/api/disciplinas'
        const response = await makeRequest({ url, method: 'POST', token: accessToken, data })
        return response
    } catch (error) {
        if (error.status === 2409) {
            const errorMessage = document.getElementById('error-message')
            if (!errorMessage) {
                const message = document.createElement('span')
                message.textContent = 'Já existe uma disciplina com esse nome'
                message.id = 'error-message'
                message.className = 'text-red-500 text-sm'

                disciplinaInput.classList.add('border-red-500')
                disciplinaContainer.appendChild(message)
            }
        } else {
            alert('Algo deu errado...')
        }
    }
    
}

document.addEventListener('DOMContentLoaded', async () => {
   const professores = await getProfessores()
   const listaProfessores = professores.professoresCadastrados
   listarProfessoresNoSelect(listaProfessores)
})

cadastroDisciplinaForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const professor_id = event.target.select.value
    const nomeDisciplina = event.target.disciplina.value

    console.log(event.target.select);

    if (nomeDisciplina.length < 3) {
        const errorMessage = document.getElementById('error-message')
        if (!errorMessage) {
            const message = document.createElement('span')
            message.textContent = 'Insira um nome válido'
            message.id = 'error-message'
            message.className = 'text-red-500 text-sm'

            disciplinaInput.classList.add('border-red-500')
            disciplinaContainer.appendChild(message)
        }

        return
    }

    let data

    if (professor_id === '') {
        data = {
            "nome": nomeDisciplina,
        }
    } else {
        data = {
            "nome": nomeDisciplina,
            "professor_id": professor_id,
        }
    }

    const response = await cadastrar(data)
    if (response.status === 204) {
        cadastroDisciplinaForm.reset()

        const toaster = SuccessToaster({
            message: 'Disciplina cadastrada com sucesso!',
        })
        openToaster({ toaster, rootId: 'main' })
        closeToaster()

    }
})

disciplinaInput.addEventListener('input', () => {
    const errorMessage = document.getElementById('error-message')
    
    if (errorMessage) {
        disciplinaInput.classList.remove('border-red-500')
        errorMessage.remove()
    }
})

goBackButton.addEventListener('click', () => {
    if (disciplinaInput.value) {
        openDialog('dialog-alteracoes')
    } else {
        navigateTo('http://localhost:5500/frontend/src/pages/adm/disciplinas.html')
    }
})

dialogAlteracoesCancelarButton.addEventListener('click', () => {
    closeDialog('dialog-alteracoes')
})