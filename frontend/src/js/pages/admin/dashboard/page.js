// Functions
import { verifyUserAccess } from '/frontend/src/js/auth/verifyUserAccess.js'
import { getAdminName } from './service/getAdminName.js'

// Components
import { Heading } from '/frontend/src/js/components/heading.js'
import { Sidebar } from '/frontend/src/js/components/sidebar.js'
import { RegisterListItem } from '/frontend/src/js/components/list.js'



async function PageDashboard() {
    verifyUserAccess('admin')
    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const painel = document.getElementById('painel')
    const painelItems = [
        {
            name: 'Aluno',
            linkPainel: '',
            linkCadastro: '',
        },{
            name: 'Professor',
            linkPainel: '',
            linkCadastro: '',
        },{
            name: 'Disciplinas',
            linkPainel: '/frontend/src/pages/adm/disciplinas.html',
            linkCadastro: '',
        },
    ]

    root.prepend(
        Sidebar({
            size: 'lg',
            items: [
                {
                    icon: '/frontend/src/img/icones/house.svg',
                    title: 'Dashboard',
                    link: '/',
                    active: true,
                },
                {
                    icon: '/frontend/src/img/icones/books.svg',
                    title: 'Painel',
                    link: '/',
                    accordion: true,
                    accordionOptions: painelItems,
                },
            ],
            changePassword: true,
        })
    )
    
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