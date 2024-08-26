// Functions
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { getProfessorName } from './service/getProfessorName.js'
import { saveWindowPath } from '/frontend/src/functions/saveWindowPath.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { SidebarProfessor, painelItems } from '/frontend/src/pages/professor/components/sidebar-professor.js'
import { RegisterListItem } from '/frontend/src/pages/admin/dashboard/components/registerListItem.js'
import { Title } from '/frontend/src/components/fonts.js'
import { Empty } from '/frontend/src/components/empty.js'


async function PageDashboard() {
    verifyUserAccess('professor')
    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const nav = document.createElement('nav')
    const ul = document.createElement('ul')

    root.prepend(SidebarProfessor())
    
    try {
        main.prepend(
            Heading({ 
                goBack: false, 
                title: 'Dashboard', 
                subtitle: `Bem vindo, ${await getProfessorName()}!`,
                subtitleSize: '2xl'
            })
        )
    } catch (error) {
        alert('Algo deu errado... Encerre a sessão e tente novamente.')
    }

    if (painelItems.length === 0) {
        main.appendChild(
            Empty('Você não está cadastrado em nenhuma disciplina ainda.')
        )
    } else {
        main.appendChild(
            Title({
                title: 'Disciplinas',
                size: 'lg',
                tone: 's-700',
                as: 'h3',
                className: 'mt-10 mb-2',
            })
        )
        nav.appendChild(ul)
        main.appendChild(nav)
    }

    painelItems.forEach((item) => {
        painel.appendChild(
            RegisterListItem({ 
                name: item.name,
                registerLink: item.linkCadastro,
                linkPainel: item.linkPainel,
            })
        )
    })

    saveWindowPath()
}

PageDashboard()