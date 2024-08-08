import { TableHead, CadastrosTableRow } from '/frontend/src/js/components/table.js'

export function RegisterDisciplinasTable(rows) {
    const headerContent = [
        {
            content: 'Nome',
        },
        {
            content: 'Professor',
            className: 'pl-4'
        },
        {
            content: 'Quiz',
            className: 'pl-4'
        },
        {
            content: 'Ações',
            className: 'pl-4'
        },
    ]
    const table = document.createElement('table')
    const thead = TableHead(headerContent)
    const tbody = document.createElement('tbody')

    table.className = 'border-separate border-spacing-table w-full'
    tbody.className = 'w-full bg-indigo-50'

    rows.forEach((row) => {
        tbody.appendChild(
            CadastrosTableRow({
                id: row.id,
                matriculaOuProfessor: row.professor ? row.professor : 'Nenhum Professor',
                name: row.name,
                type: 'disciplina',
                array: row.quizzes,
                toEdit: `http://localhost:5500/frontend/src/pages/adm/edicao/disciplinas.html?id=${row.id}`,
                toRemove: 'http://localhost:3333/api/disciplinas',
            })
        )
    })

    table.append(thead, tbody)

    return table
}