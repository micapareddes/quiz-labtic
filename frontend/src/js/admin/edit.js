function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
}

async function getDisciplina() {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        const id = getUrlParam('id')
        const url = `http://localhost:3333/api/disciplinas/${id}`
        const disciplina = await makeRequest({ url, method:'GET', token: accessToken })

        return disciplina;
    } catch (error) {
        console.log(error);
        if (error.status === 403) {
            alert('Acesso Proibido')
            redirectTo404()
        }
    }
}

async function alterarDisciplinaNoBanco(data) {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        const id = getUrlParam('id')
        const url = `http://localhost:3333/api/disciplinas/${id}`
        return await makeRequest({ url, method:'PATCH', data, token: accessToken })

    } catch (error) {
        console.log(error);
        if (error.status === 403) {
            alert('Acesso Proibido')
            redirectTo404()
        }
    }
}

function exibirNomeNoInput(nome) {
    const inputNome = document.getElementById('disciplina')
    inputNome.value = nome
}

function selecionarProfessor(id) {
    if (id) {
        const select = document.getElementById('select')
        select.value = id
    }
}

function saveOriginalValues({ nome, professorId }) {
    localStorage.setItem('1', nome)
    localStorage.setItem('2', professorId)
}

function obtainValuesFromStorage() {
    const nome = getFromLocalStorage('1')
    const professor_id = getFromLocalStorage('2')

    return {
        nome,
        professor_id
    }
}

function deleteValuesFromStorage() {
    localStorage.removeItem('1')
    localStorage.removeItem('2')
}

document.addEventListener('DOMContentLoaded', async () => {
    const disciplinaResponse = await getDisciplina()
    const disciplina = disciplinaResponse.disciplina

    const response = await getProfessores()
    const professores = response.professoresCadastrados

    exibirNomeNoInput(disciplina.nome)
    listarProfessoresNoSelect(professores)
    selecionarProfessor(disciplina.professor_id)
    saveOriginalValues({
        nome: disciplina.nome,
        professorId: disciplina.professor_id
    })
})

const form = document.getElementById('editar-form')

form.addEventListener('submit', async (e) => {
    const root = document.getElementById('root')
    e.preventDefault()

    const firstData = obtainValuesFromStorage()
    deleteValuesFromStorage()

    const newData = {
        nome: e.target.disciplina.value.trim(),
        professor_id: e.target.professor.value.trim(),
    }

    const formMudou = firstData.nome !== newData.nome  || firstData.professor_id !== newData.professor_id

    if (formMudou) {
        await alterarDisciplinaNoBanco(newData)
        localStorage.setItem('disciplinaAlterada', true)
        navigateTo('disciplinas.html')
        
    } else {
        const toaster = infoToaster({
            message: 'Não foi feita nenhuma alteração para salvar.',
            iconSrc: '../../img/icones/info.svg'
        })
        root.appendChild(toaster)
        closeToaster()
    }
})