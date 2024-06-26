const cadastroDisciplinaForm = document.getElementById('cadastro-form')
const goBackButton = document.getElementById('go-back')
const disciplinaInput = document.getElementById('disciplina')
const disciplinaContainer = document.getElementById('disciplina-container')
const dialogAlteracoesCancelarButton = document.getElementById('cancelar-dialog-button')
const dialogAlteracoesVoltarButton = document.getElementById('voltar-dialog-button')

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
        await makeRequest({ url, method: 'POST', token: accessToken, data })
    } catch (error) {
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