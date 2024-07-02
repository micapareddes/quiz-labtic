async function removerRelacaoDaDisciplina(id) {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        await makeRequest( { url: 'http://localhost:3333/api/alunos_disciplinas', method:'DELETE', data: { id }, token: accessToken})

        return

    } catch (error) {
        console.log(error.status);
    }
}

async function getDisciplinas() {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        const disciplinasCadastradas = await makeRequest( { url: 'http://localhost:3333/api/disciplinas/cadastradas', method:'GET', token: accessToken})

        return disciplinasCadastradas; 

    } catch(error) {
        console.log(error);

        if (error.status === 403) {
            alert('Acesso Proibido')
            redirectTo404()
        } else {
            alert('Algo deu errado...')
        }
    }
}


async function removerDisciplinaDoBanco(id) {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        const data = {"id": id}
        await makeRequest( { url: 'http://localhost:3333/api/disciplinas', method:'DELETE', token: accessToken, data})

        console.log('deletado!');
        return  

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

function countDown(){
    const quantidade = document.getElementById('quantidade-cadastros')
    quantidade.textContent = Number(quantidade.textContent) - 1
}

function totalDeDisciplinas(){
    const quantidade = document.getElementById('quantidade-cadastros')
    return Number(quantidade.textContent)
}

function toasterSuccess() {
    const main = document.getElementById('main')

    const toaster = successToaster({
        message: 'Disciplina removida com sucesso!', 
        iconSrc: '../../img/icones/check-circle.svg'
    })
    main.appendChild(toaster)

    closeToaster()
}

function createNameRow(name) {
    const nameRow = createHTMLElement('td')
    nameRow.className = 'px-5 py-4 rounded-l-xl'
    nameRow.textContent = name

    return nameRow
}

function createProfessorRow(name) {
    const professorRow = createHTMLElement('td')
    professorRow.textContent = name
    if (name === 'Nenhum Professor') professorRow.className = 'text-stone-400'

    return professorRow
}

function createTooltip(items) {
    const tooltip = createHTMLElement('ul')
    tooltip.className = 'hidden group-hover:block absolute mt-1 px-4 py-2 rounded-2xl border border-neutral-200 bg-neutral-50'

    items.forEach((item) => {
        const name = createHTMLElement('li')
        name.textContent = item.name
        name.className = 'p-2 cursor-none'
        tooltip.appendChild(name)
    })

    return tooltip
}

function createQuizCell(array) {
    const quizCell = createHTMLElement('td')
    quizCell.className = 'pl-6 md:pl-1'

    const quantity = createHTMLElement('span')
    quantity.className = 'px-2 py-1 rounded-md text-stone-400'
    quantity.textContent = array.length

    if (array.length !== 0) quantity.classList.add('cursor-pointer', 'hover:bg-neutral-200', 'group', 'text-stone-900')

    const tooltip = createTooltip(array)

    quantity.appendChild(tooltip)
    quizCell.appendChild(quantity)

    return quizCell
}

function createActionsCell({ onEdit, onRemove }) {
    const actionsCell = createHTMLElement('td')
    actionsCell.className = 'px-5 py-4 rounded-r-xl'

    const editarButton = createHTMLElement('a')
    editarButton.className = 'mr-6 lg:mr-8 text-indigo-700 hover:underline underline-offset-4 cursor-pointer'
    editarButton.textContent = 'Editar'
    editarButton.addEventListener('click', () => {
        onEdit()
    })

    const removerButton = createHTMLElement('button')
    removerButton.className = 'mr-6 lg:mr-8 text-indigo-700 hover:underline underline-offset-4 cursor-pointer'
    removerButton.textContent = 'Remover'

    removerButton.addEventListener('click', () => {
        onRemove()
    })

    actionsCell.append(editarButton, removerButton)
    
    return actionsCell
}

function openEditarDisciplinaPage(id) {
    const url = `http://localhost:5500/frontend/src/pages/adm/editar.html?id=${id}`
    navigateTo(url)
}

// Aqui se encontra a lógica de deletar a disciplina e relação na função do dialog
async function createTableRow({ nome, professor, quizzes, disciplinaId }) {
    const row = createHTMLElement('tr')
    row.className = 'bg-neutral-100 shadow-sm rounded-xl'
    
    const nameCell = createNameRow(nome)
    const professorCell = createProfessorRow(professor)
    const quizCell = createQuizCell(quizzes)

    const dialog = createAlertDialog({
        message: `Você irá remover a disciplina "${nome}".Esta ação não pode ser desfeita.`, 
        confirmarButtonName: 'Remover', 
        onConfirm: async () => { 
            await removerDisciplinaDoBanco(disciplinaId)
            await removerRelacaoDaDisciplina(disciplinaId)
            row.remove()
            countDown()
            const total = totalDeDisciplinas()
            if (total === 0) nenhumCadastro()
            toasterSuccess() 
        }
    })

    const actionsCell = createActionsCell({
        onEdit: () => {
            openEditarDisciplinaPage(disciplinaId)
        },
        onRemove: () => {
            openDialog({ dialog, rootId: 'root' })
        }
    })

    row.append(nameCell, professorCell, quizCell, actionsCell)

    return row
}

function createTable(cadastros) {
    const tableBody = document.getElementById('tbody')

    cadastros.forEach(async (cadastro) => {
        const nome = cadastro.nome
        const professor = cadastro.professor_id ? cadastro.professor_id.nome : 'Nenhum Professor'
        const quizzes = cadastro.quizes
        const disciplinaId = cadastro._id

        const tableRow = await createTableRow({ nome, professor, quizzes, disciplinaId })
        tableBody.appendChild(tableRow)
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    const response = await getDisciplinas()
    const disciplinas = response.disciplinasCadastradas

    const quantidadeCadastros = disciplinas.length
    mostrarQuantidadeCadastros(quantidadeCadastros)
    
    if (quantidadeCadastros === 0) {
        nenhumCadastro()
        
    } else {
        createTable(disciplinas)
        if (getFromLocalStorage('disciplinaAlterada')) {
            const root = document.getElementById('root')
            const toaster = successToaster({
                message: 'Alterações salvas!',
                iconSrc: '../../img/icones/check-circle.svg'
            })
            root.appendChild(toaster)
            closeToaster()
            localStorage.removeItem('disciplinaAlterada')
    }
}})