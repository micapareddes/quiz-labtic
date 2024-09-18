// Functions
import { ROUTES } from '/frontend/src/utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { getProfessoresWithDisciplinas } from './service/getProfessoresWithDisciplinas.js'
import { removeOriginalValuesFromStorage } from '/frontend/src/pages/admin/functions/removeOriginalValuesFromStorage.js'

// Components
import { SidebarAdmin } from '/frontend/src/pages/admin/components/sidebar-admin.js'
import { Heading } from '/frontend/src/components/heading.js'
import { ProfessorTable } from './components/professor-table.js'
import { Button } from '/frontend/src/components/button.js'
import { Empty } from '/frontend/src/components/empty.js'
import { SuccessToaster, openToaster, closeToaster } from '/frontend/src/components/toaster.js'

async function ProfessoresPage() {
    verifyUserAccess('admin')
    removeOriginalValuesFromStorage()
    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const header = document.createElement('div')
    const professores = await getProfessoresWithDisciplinas()
    const quantidadeProfessores = professores.length
    
    header.className = 'flex flex-row justify-between items-start mb-10'
    header.append(        
        Heading({
            goBack: true, 
            onGoBack: () => history.back(),
            title: 'Professores', 
            subtitle: `${quantidadeProfessores} cadastrados`,
            subtitleSize: 'lg',
        }),
        Button({
            variant: 'primary',
            size: 'md',
            title: 'Cadastrar',
            ariaLabel: 'Botão para cadastrar novo professor',
            icon: 'file-plus',
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
            ProfessorTable(professores)
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
}
ProfessoresPage()