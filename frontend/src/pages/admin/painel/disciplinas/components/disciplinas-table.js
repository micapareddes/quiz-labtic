import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { TableHead, CadastrosTableRow } from '/frontend/src/components/table.js'
import { removeFromDatabaseById } from '/frontend/src/pages/admin/service/removeFromDatabaseById.js'

export function DisciplinasTable(rows) {
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
                matriculaOuProfessor: row.professor,
                name: row.name,
                type: 'disciplina',
                array: row.quizzes,
                toEdit: ROUTES.ADMIN.EDICAO.DISCIPLINAS(row.id),
                onRemove: async () => {
                    await removeFromDatabaseById({
                        id: row.id, 
                        url: API_ENDPOINTS.DELETE_DISCIPLINA,
                    })
                    await removeFromDatabaseById({
                        id: row.id, 
                        url: API_ENDPOINTS.DELETE_RELATION_BY_DISCIPLINA_ID,
                    })
                },
            })
        )
    })

    table.append(thead, tbody)

    return table
}