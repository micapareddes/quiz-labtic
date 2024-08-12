import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { TableHead, CadastrosTableRow } from '/frontend/src/components/table.js'

export function UsersTable({ type, rows }) {
    const headerContent = [
        {
            content: 'Nome',
        },
        {
            content: 'Matricula',
            className: 'pl-4'
        },
        {
            content: 'Disciplinas',
        },
        {
            content: 'Ações',
        },
    ]

    const table = document.createElement('table')
    const thead = TableHead(headerContent)
    const tbody = document.createElement('tbody')
    
    table.className = 'border-separate border-spacing-table'

    rows.forEach((row) => {
        tbody.appendChild(
            CadastrosTableRow({
                id: row.id,
                matriculaOuProfessor: row.matricula,
                name: row.name,
                type,
                array: row.disciplinas,
                toEdit: row.toEdit,
                toRemove: row.toRemove,
            })
        )
    })

    table.append(thead, tbody)

    return table
}