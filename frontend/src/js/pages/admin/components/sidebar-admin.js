import { Sidebar } from '/frontend/src/js/components/sidebar.js'
export const painelItems = [
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
        linkPainel: '/frontend/src/pages/adm/painel/disciplinas.html',
        linkCadastro: '/frontend/src/pages/adm/cadastro/disciplinas.html',
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