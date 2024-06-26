async function getDisciplinas() {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        const disciplinasCadastradas = await makeRequest( { url: 'http://localhost:3333/api/disciplinas/cadastradas', method:'GET', token: accessToken})

        return disciplinasCadastradas; 

    } catch(error) {
        console.log(error);

        if (error.status === 403) {
            alert('Acesso Proibido')
        } else {
            alert('Algo deu errado...')
        }
    }
}

function nenhumCadastro() {
    const main = document.getElementById('main')
    const table = document.getElementById('table')

    table.className = 'hidden'
        
    const div = createHTMLElement('div')
    div.className = 'flex h-screen flex-col items-center justify-center'
    const img = createHTMLElement('img')
    img.src = '../../img/no-data-100.svg'
    img.alt = 'Duas pranchetas sobrepostas com clipes lilas.'
    img.className = 'w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96'

    const p = createHTMLElement('p')
    p.textContent = 'Não existe nada cadastrado'
    p.className = 'px-5 py-4 text-stone-400 text-lg md:text-xl lg:text-2xl block text-center mt-6'

    div.appendChild(img)
    div.appendChild(p)
    main.appendChild(div)

}

function mostrarQuantidadeCadastros(total) {
    const quantidadeCadastros = document.getElementById('quantidade-cadastros')
    quantidadeCadastros.textContent = total
}

function createLine(tr, nome, professor, quizzes) {
    const nomeCol = createHTMLElement('td')
    nomeCol.className = 'px-5 py-4 rounded-l-xl'
    nomeCol.textContent = nome

    const professorCol = createHTMLElement('td')
    professorCol.textContent = professor

    if (professor === 'Nenhum Professor') {
        professorCol.className = 'text-stone-400'
    }

    const quizCol = createHTMLElement('td')
    quizCol.className = 'pl-6 md:pl-1'

    const span = createHTMLElement('span')
    span.className = 'px-2 py-1 rounded-md'
    span.textContent = quizzes.length

    if (quizzes.length !== 0) span.classList.add('cursor-pointer', 'hover:bg-neutral-200', 'group')

    const ul = createHTMLElement('ul')
    ul.className = 'hidden group-hover:block absolute mt-1 px-4 py-2 rounded-2xl border border-neutral-200 bg-neutral-50'

    quizzes.forEach((quiz) => {
        const li = createHTMLElement('li')
        li.textContent = quiz.nome
        li.className = 'p-2 cursor-none'

        ul.appendChild(li)
    })

    span.appendChild(ul)
    quizCol.appendChild(span)

    const actions = createHTMLElement('td')
    actions.className = 'px-5 py-4 rounded-r-xl'

    const editarAction = createHTMLElement('a')
    editarAction.className = 'mr-6 lg:mr-8 text-indigo-700 hover:underline underline-offset-4 cursor-pointer'
    editarAction.textContent = 'Editar'
    editarAction.href = 'http://localhost:5500/frontend/src/pages/adm/editar.html'

    const removerAction = createHTMLElement('button')
    removerAction.className = 'mr-6 lg:mr-8 text-indigo-700 hover:underline underline-offset-4 cursor-pointer'
    removerAction.textContent = 'Remover'

    actions.append(editarAction, removerAction)
    
    tr.append(nomeCol, professorCol, quizCol, actions)
}

function createTable(cadastros) {
    const tableBody = document.getElementById('tbody')

    cadastros.forEach((cadastro) => {
        const tr = createHTMLElement('tr')
        tr.className = 'bg-neutral-100 shadow-sm rounded-xl'
        console.log();
        let professor = 'Nenhum Professor'
        if (cadastro.professor_id) {
            professor = cadastro.professor_id.nome
        }

        createLine(tr, cadastro.nome, professor, cadastro.quizes)
        tableBody.appendChild(tr)
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    const disciplinasCadastradas = await getDisciplinas()
    const disciplinas = disciplinasCadastradas.disciplinasCadastradas

    const quantidadeCadastros = disciplinas.length

    mostrarQuantidadeCadastros(quantidadeCadastros)
    
    if (quantidadeCadastros === 0) {
        nenhumCadastro()
    } else {
        createTable(disciplinas)
    }
})