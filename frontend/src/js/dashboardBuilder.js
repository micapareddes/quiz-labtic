async function fetchDisciplinas(accessToken, url) {
    try {
        const disciplinas = await makeRequest({ url, method: 'GET', token: accessToken })
        console.log(disciplinas);
        return disciplinas

    } catch (error) {
        if (error.status === 403 || error.status === 401) {
            window.location.href = 'http://localhost:5500/frontend/src/pages/login.html' 
            localStorage.removeItem('accessToken')
            localStorage.removeItem('type')
        } else {
            alert('Algo deu errado...')
            console.log('ERROR! ', error);
        }
    }
}

// elementos do dashboard -------------------
function criarUiDisciplina(nomeDisciplina) {
    const li = document.createElement('li')
    const a = document.createElement('a')

    a.className = "block px-5 py-4 bg-neutral-100 border hover:bg-neutral-200 transition-colors duration-200 border-neutral-200 rounded-xl cursor-pointer mb-2"
    a.textContent = nomeDisciplina

    li.appendChild(a)

    return li
}

function nenhumaDisciplinaCadastradaUi() {
    const main = document.getElementById('main')
    const htmlTituloDisciplinas = document.getElementById('titulo-disciplinas')

    htmlTituloDisciplinas.className = 'hidden'
    
    const div = document.createElement('div')
    div.className = 'flex h-screen flex-col items-center justify-center'
    const img = document.createElement('img')
    img.src = '../../img/no-data-100.svg'
    img.alt = 'Duas pranchetas sobrepostas com clipes lilas.'
    img.className = 'w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96'

    const p = document.createElement('p')
    p.textContent = 'Você não está cadastrado em nenhuma disciplina'
    p.className = 'px-5 py-4 text-stone-400 text-lg md:text-xl lg:text-2xl block text-center mt-6'

    div.appendChild(img)
    div.appendChild(p)
    main.appendChild(div)
}

async function criarUiDashboard(token, url) {
    const htmlListaDisciplinas = document.getElementById('lista-disciplinas')
    const {disciplinas, nome} = await fetchDisciplinas(token, url)
    
    mostrarNomeUsuario(nome)

    if (disciplinas.length > 0) {
        criarUlDisciplinasSidebar()
        disciplinas.forEach(disciplina => {
            const nomeDisciplina = disciplina.disciplina_nome ?? disciplina.nome
            const uiDiscplina = criarUiDisciplina(nomeDisciplina)
            htmlListaDisciplinas.appendChild(uiDiscplina)
            criarLiDisciplinasSidebar(nomeDisciplina)
        })
    } else {
        nenhumaDisciplinaCadastradaUi()
        inabilitarAccordionDisciplinas()
    } 
}