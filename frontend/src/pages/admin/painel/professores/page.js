// Functions
import { ROUTES } from '/frontend/src/utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { saveWindowPath } from '/frontend/src/functions/saveWindowPath.js'
import { getProfessores } from './service/getProfessores.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { SidebarAdmin } from '/frontend/src/pages/admin/components/sidebar-admin.js'
import { UsersTable } from '/frontend/src/pages/admin/painel/components/users-table.js'
import { Button } from '/frontend/src/components/button.js'
import { Empty } from '/frontend/src/components/empty.js'
import { SuccessToaster, openToaster, closeToaster } from '/frontend/src/components/toaster.js'

async function ProfessoresPage() {
    verifyUserAccess('admin')
    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const header = document.createElement('div')
    // const professores = await getProfessores()
    const professores = [{
        nome: 'Severus Snape',
        matricula: '123223',
        disciplinas: [],
        id: 'abcsd'
    }]
    const quantidadeProfessores = professores.length

    header.className = 'flex flex-row justify-between items-start mb-10'
    header.append(        
        Heading({
            goBack: true, 
            onGoBack: () => navigateTo(ROUTES.ADMIN.DASHBOARD),
            title: 'Professores', 
            subtitle: `${quantidadeProfessores} cadastrados`,
            subtitleSize: 'lg',
        }),
        Button({
            variant: 'primary',
            size: 'md',
            title: 'Cadastrar',
            icon: true,
            link: ROUTES.ADMIN.CADASTRO.PROFESSORES
        })
    )
    root.prepend(SidebarAdmin())

    main.append(header)

    if (quantidadeProfessores === 0) {
        main.appendChild(
            Empty('Não há professores cadastrados.')
        )
    } else {
        main.appendChild(
            UsersTable({ type: 'professor', rows: professores})
        )
        const professorAlterado = localStorage.getItem('professorAlterado')
        if (professorAlterado) {
            openToaster(
                SuccessToaster({
                    message: `Alterações do aluno "${professorAlterado}" salvas!`
                })
            )
            closeToaster()
            localStorage.removeItem('professorAlterado')
        }
    }
    saveWindowPath()
}
ProfessoresPage()