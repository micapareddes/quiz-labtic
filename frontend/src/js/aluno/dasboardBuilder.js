const buttonEncerrarSessao = document.getElementById('encerrar-sessao-button')
const buttonCancelarDialogEncerrarSessao = document.getElementById('cancelar-button-encerrar-sessao-dialog')
const buttonConfirmarDialogEncerrarSessao = document.getElementById('confirmar-button-encerrar-sessao-dialog')
const disciplinasButton = document.getElementById('disciplinas-button')

async function fetchDisciplinas(accessToken) {
    try {
        const url = 'http://localhost:3333/api/alunos_disciplinas'

        const disciplinas = await makeRequest({ url, method: 'GET', token: accessToken })

        return disciplinas

    } catch (error) {
        if (error.status === 403 || error.status === 401) {
            window.location.href = 'http://localhost:5500/frontend/src/pages/login.html' 
            localStorage.removeItem('accessToken')
            localStorage.removeItem('type')
        } else {
            alert('Algo deu errado :(')
            console.log('ERROR! ', error);
        }
    }
}

function criarUiDisciplina(disciplina) {
    const htmlListaDisciplinas = document.getElementById('lista-disciplinas')

    const li = createHTMLElement('li')
    const a = createHTMLElement('a')

    a.className = "block px-5 py-4 bg-neutral-100 border hover:bg-neutral-200 transition-colors duration-200 border-neutral-200 rounded-xl cursor-pointer mb-2"
    a.textContent = disciplina.disciplina_nome

    li.appendChild(a)

    htmlListaDisciplinas.appendChild(li)
}

function inabilitarHoverDisciplinasButton() {
    const seta = document.getElementById('seta-disciplinas-button')
    const titulo = document.getElementById('p-disciplinas-button')

    seta.classList.remove('group-hover:rotate-0')
    disciplinasButton.classList.remove('hover:border-l-yellow-200')
    disciplinasButton.classList.add('opacity-50')
    titulo.classList.remove('group-hover:font-semibold')
}

function criarUlDisciplinasMenu() {
    const itemDisciplinasLi = document.getElementById('disciplinas-li')

    const ul = createHTMLElement('ul')
    ul.id = 'ul-disciplinas'
    ul.className = 'px-8 hidden flex-col items-start justify-center mt-5'

    itemDisciplinasLi.appendChild(ul)
}

function criarLiDisciplinasDoMenu(disciplina) {
    const ul = document.getElementById('ul-disciplinas')

    const li = createHTMLElement('li')
    const a = createHTMLElement('a')
    a.className = 'block cursor-pointer mb-4 text-indigo-50 text-sm hover:text-yellow-200'
    a.textContent = disciplina

    li.appendChild(a)
    ul.appendChild(li)
}

function mostrarNomeAluno(nome) {
    const htmlSpanNome = document.getElementById('nome-aluno')
    htmlSpanNome.textContent = nome
}

function nenhumaDisciplinaCadastradaUi() {
    const htmlMainDashboardAluno = document.getElementById('main-dashboard')
    const htmlTituloDisciplinas = document.getElementById('titulo-disciplinas')

    htmlTituloDisciplinas.className = 'hidden'
    
    const div = createHTMLElement('div')
    div.className = 'flex h-screen flex-col items-center justify-center'
    const img = createHTMLElement('img')
    img.src = '../../img/no-data-100.svg'
    img.alt = 'Duas pranchetas sobrepostas com clipes lilas.'
    img.className = 'w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96'

    const p = createHTMLElement('p')
    p.textContent = 'Você não está cadastrado em nenhuma disciplina'
    p.className = 'px-5 py-4 text-stone-400 text-lg md:text-xl lg:text-2xl block text-center mt-6'

    div.appendChild(img)
    div.appendChild(p)
    htmlMainDashboardAluno.appendChild(div)
}

async function criarDashboardAluno(alunoId) {
    const { disciplinas, nomeAluno } = await fetchDisciplinas(alunoId)
    console.log(disciplinas);
    mostrarNomeAluno(nomeAluno)

    if (disciplinas.length > 0) {
        criarUlDisciplinasMenu()
        disciplinas.forEach(disciplina => {
            criarUiDisciplina(disciplina)
            criarLiDisciplinasDoMenu(disciplina.disciplina_nome)
        })
    } else {
        nenhumaDisciplinaCadastradaUi()
        inabilitarHoverDisciplinasButton()
    } 
}

function signOut() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('type')
    window.location.href = 'http://localhost:5500/frontend/src/pages/login.html'
}

document.addEventListener('DOMContentLoaded', () => {
    const accessToken = getFromLocalStorage('accessToken')

    verifyUserAccess('aluno')
    criarDashboardAluno(accessToken)
})

buttonEncerrarSessao.addEventListener('click', () => {
    openDialog('dialog-encerrar-sessao')
})

buttonCancelarDialogEncerrarSessao.addEventListener('click', () => {
    closeDialog('dialog-encerrar-sessao')
})

buttonConfirmarDialogEncerrarSessao.addEventListener('click', () => {
    signOut()
})

disciplinasButton.addEventListener('click', () => {
    console.log('click!');
    const dataActive = disciplinasButton.getAttribute('data-active')
    const isActive = dataActive === 'true'
    const listaDisciplinas = document.getElementById('ul-disciplinas')

    if (!isActive && listaDisciplinas) {
        console.log('entrou');
        disciplinasButton.setAttribute('data-active', true)
        listaDisciplinas.classList.remove('hidden')
        listaDisciplinas.classList.add('flex')
    } else if (isActive && listaDisciplinas) {
        disciplinasButton.setAttribute('data-active', false)
        listaDisciplinas.classList.remove('flex')
        listaDisciplinas.classList.add('hidden')
    }
})