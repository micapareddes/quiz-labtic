import { ROUTES } from '/frontend/src/utils/routes.js'
import { Sidebar } from '/frontend/src/components/sidebar.js'
export const painelItems = [
    {
        name: 'Alunos',
        linkPainel: ROUTES.ADMIN.PAINEL.ALUNOS,
        linkCadastro: '',
    },{
        name: 'Professor',
        linkPainel: ROUTES.ADMIN.PAINEL.PROFESSORES,
        linkCadastro: '',
    },{
        name: 'Disciplinas',
        linkPainel: ROUTES.ADMIN.PAINEL.DISCIPLINAS,
        linkCadastro: ROUTES.ADMIN.CADASTRO.DISCIPLINAS,
    },
]
export function SidebarAdmin() {
    return Sidebar({
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
}