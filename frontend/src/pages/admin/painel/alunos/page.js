// Functions
import { ROUTES } from '/frontend/src/utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { saveWindowPath } from '/frontend/src/functions/saveWindowPath.js'
import { getStudents } from './service/getStudents.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { SidebarAdmin } from '/frontend/src/pages/admin/components/sidebar-admin.js'
import { UsersTable } from '/frontend/src/pages/admin/painel/components/users-table.js'
import { Button } from '/frontend/src/components/button.js'
import { Empty } from '/frontend/src/components/empty.js'
import { SuccessToaster, openToaster, closeToaster } from '/frontend/src/components/toaster.js'

async function AlunosPage() {
    verifyUserAccess('admin')
    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const header = document.createElement('div')
    const alunos = await getStudents()
    const quantidadeAlunos = alunos.length

    header.className = 'flex flex-row justify-between items-start mb-10'
    header.append(        
        Heading({
            goBack: true, 
            onGoBack: () => navigateTo(ROUTES.ADMIN.DASHBOARD),
            title: 'Alunos', 
            subtitle: `${quantidadeAlunos} cadastradas`,
            subtitleSize: 'lg',
        }),
        Button({
            variant: 'primary',
            size: 'md',
            title: 'Cadastrar',
            icon: true,
            link: ROUTES.ADMIN.CADASTRO.ALUNOS
        })
    )
    root.prepend(SidebarAdmin())

    main.append(header)

    if (quantidadeAlunos === 0) {
        main.appendChild(
            Empty('Não há alunos cadastrados.')
        )
    } else {
        main.appendChild(
            UsersTable({ type: 'aluno', rows: alunos})
        )
        const alunoAlterado = localStorage.getItem('alunoAlterado')
        if (alunoAlterado) {
            openToaster(
                SuccessToaster({
                    message: `Alterações do aluno "${alunoAlterado}" salvas!`
                })
            )
            closeToaster()
            localStorage.removeItem('alunoAlterado')
        }
    }
    saveWindowPath()
}
AlunosPage()