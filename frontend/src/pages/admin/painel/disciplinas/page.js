// Functions
import { ROUTES } from '/frontend/src/utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { getDisciplinas } from '/frontend/src/pages/admin/service/getDisciplinas.js'
import { parseDisciplinas } from '/frontend/src/pages/admin/painel/disciplinas/functions/parseDisciplinas.js'
import { removeOriginalValuesFromStorage } from '/frontend/src/pages/admin/functions/removeOriginalValuesFromStorage.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { SidebarAdmin } from '/frontend/src/pages/admin/components/sidebar-admin.js'
import { DisciplinasTable } from '/frontend/src/pages/admin/painel/disciplinas/components/disciplinas-table.js'
import { Button } from '/frontend/src/components/button.js'
import { Empty } from '/frontend/src/components/empty.js'
import { SuccessToaster, openToaster, closeToaster } from '/frontend/src/components/toaster.js'

async function DisciplinasPage() {
    verifyUserAccess('admin')
    removeOriginalValuesFromStorage()
    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const header = document.createElement('div')
    const disciplinas = await getDisciplinas()
    const disciplinasFormatadas = parseDisciplinas(disciplinas)
    const quantidadeDisciplinas = disciplinas.length

    header.className = 'flex flex-col gap-4 md:flex-row justify-between items-start mb-10'
    header.append(        
        Heading({
            goBack: true, 
            onGoBack: () => history.back(),
            title: 'Disciplinas', 
            subtitle: `${quantidadeDisciplinas} cadastradas`,
            subtitleSize: 'lg',
        }),
        Button({
            variant: 'primary',
            size: 'md',
            title: 'Cadastrar',
            ariaLabel: 'Botão para cadastrar nova disciplina',
            icon: 'file-plus',
            link: ROUTES.ADMIN.CADASTRO.DISCIPLINAS
        })
    )
    root.prepend(SidebarAdmin())

    main.append(header)

    if (quantidadeDisciplinas === 0) {
        main.appendChild(
            Empty('Não há disciplinas cadastradas.')
        )
    } else {
        main.appendChild(
            DisciplinasTable(disciplinasFormatadas) 
        )
        const disciplinaAlterada = localStorage.getItem('disciplinaAlterada')
        if (disciplinaAlterada) {
            openToaster(
                SuccessToaster({
                    message: `Alterações da disciplina "${disciplinaAlterada}" salvas!`
                })
            )
            closeToaster()
            localStorage.removeItem('disciplinaAlterada')
        }
    }

    if (localStorage.getItem('quizEditado')) {
        localStorage.removeItem('quizEditado')
        openToaster(
            SuccessToaster({
                message: 'Edições de quiz salvas!'
            })
        ) 
        closeToaster()
    }
}
DisciplinasPage()