import { ROUTES } from '/frontend/src/utils/routes.js'
import { Sidebar } from '/frontend/src/components/sidebar.js'
export const painelItems = [
] //TODO: importar disciplinas do professor
export function SidebarProfessor() {
    return Sidebar({
        size: 'lg',
        items: [
            {
                icon: 'house',
                title: 'Dashboard',
                link: '/',
                active: true,
            },
            {
                icon: 'books',
                title: 'Painel',
                link: '/',
                accordion: true,
                accordionOptions: painelItems,
            },
            {
                icon: 'file-plus',
                title: 'Criar quiz',
                link: '/',
            },
        ],
        changePassword: true,
    })
}