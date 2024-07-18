import {Sidebar} from './components/sidebar.js'

const root = document.getElementById('root')

const items = [
    {
        icon: '/frontend/src/img/icones/house.svg',
        title: 'Dashboard',
        link: '/',
        active: true,
    },{
        icon: '/frontend/src/img/icones/books.svg',
        title: 'Disciplinas',
        link: '/',
        accordion: true,
        accordionOptions: [
            {
                name: 'Aluno',
                link: '/'
            },{
                name: 'Professor',
                link: '/'
            },
        ],
    },{
        icon: '/frontend/src/img/icones/books.svg',
        title: 'Disciplinas',
        link: '/',
        accordion: true,
        accordionOptions: [
            {
                name: 'Aluno',
                link: '/'
            },{
                name: 'Professor',
                link: '/'
            },
        ],
    },
]
root.prepend(
    Sidebar({ size: 'lg', items: items })
)
