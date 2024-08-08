// Functions
import { verifyUserAccess } from '/frontend/src/js/auth/verifyUserAccess.js'
import { getAdminName } from './service/getAdminName.js'

// Components
import { Heading } from '/frontend/src/js/components/heading.js'
import { SidebarAdmin, painelItems } from '/frontend/src/js/pages/admin/components/sidebar-admin.js'
import { RegisterListItem } from '/frontend/src/js/pages/admin/dashboard/components/registerListItem.js'


async function PageDashboard() {
    verifyUserAccess('admin')
    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const painel = document.getElementById('painel')

    root.prepend(SidebarAdmin())
    
    try {
        main.prepend(
            Heading({ 
                goBack: false, 
                title: 'Dashboard', 
                subtitle: `Bem vindo, ${await getAdminName()}!`,
                subtitleSize: '2xl'
            })
        )
    } catch (error) {
        alert('Algo deu errado... Encerre a sessão e tente novamente.')
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
}

PageDashboard()