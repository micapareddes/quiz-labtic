import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { TableHead, CadastrosTableRow } from '/frontend/src/components/table.js'
import { removeFromDatabaseById } from '/frontend/src/pages/admin/service/removeFromDatabaseById.js'

export function ProfessorTable(rows) {
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
                id: row._id,
                matriculaOuProfessor: row.matricula,
                name: row.nome,
                type: 'professor',
                array: row.disciplinas,
                toEdit: ROUTES.ADMIN.EDICAO.PROFESSORES(row._id),
                onRemove: async () => {
                    try {
                        await removeFromDatabaseById({
                            id: row._id, 
                            url: API_ENDPOINTS.DELETE_USER,
                        })
                        await removeFromDatabaseById({
                            id: row._id, 
                            url: API_ENDPOINTS.DELETE_PROFESSOR_FROM_DISCIPLINA,
                        })
                    } catch (error) {
                        console.log(error);
                        if (error.status === 403) {
                            alert('Acesso Proibido')
                        } else {
                            alert('Algo deu errado, tente novamente mais tarde...')
                        }
                    }
                },
            })
        )
    })
    table.append(thead, tbody)

    return table
}