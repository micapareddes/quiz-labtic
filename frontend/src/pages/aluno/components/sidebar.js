import { ROUTES } from '/frontend/src/utils/routes.js'
import { Sidebar } from '/frontend/src/components/sidebar.js'

export function SidebarAluno(size='lg') {
    return Sidebar({
        size: size,
        items: [
            {
                icon: 'house',
                title: 'Dashboard',
                link: '/',
                active: true,
            },
            {
                icon: 'books',
                title: 'Disciplinas',
                link: '/',
                accordion: false,
            },
        ],
        changePassword: true,
    })
}