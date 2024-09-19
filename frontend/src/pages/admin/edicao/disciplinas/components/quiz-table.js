import { ROUTES } from "/frontend/src/utils/routes.js"

import { Text } from "/frontend/src/components/fonts.js"
import { EditRemoveActionButtons } from "/frontend/src/components/edit-remove.js"
import { TableHead, TableRow } from "/frontend/src/components/table.js"

export function QuizTable(quizzes) {
    const headerContent = [
        {
            content: 'Nome',
        },
        {
            content: 'Ações',
        },
    ]
    const table = document.createElement('table')
    const thead = TableHead(headerContent)
    const tbody = document.createElement('tbody')

    table.className = 'border-separate border-spacing-table'
    quizzes.forEach((quiz) => {
        tbody.appendChild(
            TableRow({
                cells: [
                    {
                        content: Text({
                            text: quiz.nome,
                            size: 'md',
                            tone: 's-900',
                        }),
                        className: 'w-auto'
                    },
                    {
                        content: EditRemoveActionButtons({
                            onEdit: ROUTES.ADMIN.EDICAO.QUIZZES(quiz.quiz_id)
                        }),
                        className: 'w-1/100'
                    },
                ]
            })
        )
    })
    table.append(thead, tbody)
    return table
}