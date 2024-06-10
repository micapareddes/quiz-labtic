function createHTMLElement(type) {
    return document.createElement(type)
}

async function fetchDisciplinas(alunoId) {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjM4ZWE4ZmFmZTk3MTVjYzg0MTNhZiIsImlhdCI6MTcxODA0MzYwN30.ircpaV5J1XwylKGHcH78OkGM5bk-xH0PFSxApXFImLo"

        const response = await fetch('http://localhost:3333/api/alunos_disciplinas', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })

        const disciplinas = await response.json()
        
        return disciplinas

    } catch (error) {
        console.log('Erro no fetching disciplinas: ', error)
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
    img.src = '../img/no-data-100.svg'
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
    mostrarNomeAluno(nomeAluno)

    if (disciplinas.length > 0) {
        disciplinas.forEach(disciplina => {
            criarUiDisciplina(disciplina)
        })
    } else {
        nenhumaDisciplinaCadastradaUi()
    } 
}

const idNeville =  '66609d73ed34024068dea28f' // sem disciplinas
const idRon = '665e2b9a29318dea7acfd48c'
const idHarry = '665e2b8e29318dea7acfd489'
const idHermione = '665e2b7f29318dea7acfd486'

document.addEventListener('DOMContentLoaded', (event) => {
    criarDashboardAluno(idNeville);
})