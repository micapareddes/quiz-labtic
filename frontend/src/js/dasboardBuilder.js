function createHTMLElement(type) {
    return document.createElement(type)
}

async function fetchDisciplinas(alunoId) {
    try {
        const response = await fetch(`http://localhost:3333/api/alunos_disciplinas/relacao_aluno/${alunoId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const disciplinas = await response.json()
        console.log(disciplinas)
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
    const htmlListaDisciplinas = document.getElementById('lista-disciplinas')
    
    const span = createHTMLElement('span')

    span.textContent = 'Você não está cadastrado em nenhuma disciplina.'
    span.className = 'px-5 py-4 text-stone-500 block'

    htmlListaDisciplinas.appendChild(span)
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

const alunoId = '665e2b7f29318dea7acfd486'

document.addEventListener('DOMContentLoaded', (event) => {
    criarDashboardAluno(alunoId);
})