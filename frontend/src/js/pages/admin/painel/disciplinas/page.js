// Functions
import { verifyUserAccess } from '/frontend/src/js/auth/verifyUserAccess.js'
import { getDisciplinas } from '/frontend/src/js/pages/admin/painel/disciplinas/service/getDisciplinas.js'
import { parseDisciplinas } from '/frontend/src/js/pages/admin/painel/disciplinas/functions/parseDisciplinas.js'

// Components
import { Heading } from '/frontend/src/js/components/heading.js'
import { SidebarAdmin } from '/frontend/src/js/pages/admin/components/sidebar-admin.js'
import { RegisterDisciplinasTable } from '/frontend/src/js/pages/admin/painel/disciplinas/components/table.js'
import { Button } from '/frontend/src/js/components/button.js'
import { Empty } from '/frontend/src/js/components/empty.js'
import { SuccessToaster, openToaster, closeToaster } from '/frontend/src/js/components/toaster.js'

async function DisciplinasPage() {
    verifyUserAccess('admin')
    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const header = document.createElement('div')
    const disciplinas = await getDisciplinas()
    const disciplinasFormatadas = parseDisciplinas(disciplinas)
    const quantidadeDisciplinas = disciplinas.length

    header.className = 'flex flex-row justify-between items-start mb-10'
    header.append(        
        Heading({
            goBack: true, 
            title: 'Disciplinas', 
            subtitle: `${quantidadeDisciplinas} cadastradas`,
            subtitleSize: 'lg'
        }),
        Button({
            variant: 'primary',
            size: 'md',
            title: 'Cadastrar',
            icon: true,
            link: '/frontend/src/pages/adm/cadastroDisciplina.html'
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
            RegisterDisciplinasTable(disciplinasFormatadas) 
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
}
DisciplinasPage()