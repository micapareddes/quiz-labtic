const cadastroDisciplinaForm = document.getElementById('cadastro-form')
const goBackButton = document.getElementById('go-back')
const disciplinaInput = document.getElementById('disciplina')
const disciplinaContainer = document.getElementById('disciplina-container')
const dialogAlteracoesCancelarButton = document.getElementById('cancelar-dialog-button')
const dialogAlteracoesVoltarButton = document.getElementById('voltar-dialog-button')
const toaster = document.getElementById('toaster')
const closeToaster = document.getElementById('close-toaster')
const main = document.getElementById('main')

async function getProfessores() {
    const accessToken = getFromLocalStorage('accessToken')
    const professoresCadastrados = await makeRequest( { url: 'http://localhost:3333/api/usuarios/professores', method:'GET', token: accessToken})
    console.log(professoresCadastrados);
    return professoresCadastrados;
}

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
                const message = createHTMLElement('span')
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

function listarProfessoresNoSelect(listaProfessores) {
    const select = document.getElementById('select')

    listaProfessores.forEach((professor) => {
        const option = createHTMLElement('option')
        option.value = professor._id
        option.textContent = professor.nome
        select.appendChild(option)
    })
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
            const message = createHTMLElement('span')
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

        // cria toaster de sucesso
        const toaster = successToaster('Disciplina cadastrada com sucesso!', '../../img/icones/check-circle.svg')
        main.appendChild(toaster)

        // remove toaster após 10 segundos
        const toasterId = document.getElementById('toaster')
        setTimeout(() => {
            toasterId.remove()
        }, 5000);

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

closeToaster.addEventListener('click', () => toaster.classList.add('hidden'))