import { AlertDialog, openDialog } from './dialog.js'
import { LogoLado } from './logo-lado.js'
import { signOut } from '../auth/singOut.js'

function Item({ 
    icon='/frontend/src/img/icones/question.svg', title, link=null, onClick=null, accordion=false, accordionOptions=[], active=false 
}) {
    const container = createHTMLElement('li')
    const action = link ? createHTMLElement('a') : createHTMLElement('button')
    const image = createHTMLElement('img')
    const text = createHTMLElement('p')

    container.className = 'group'

    action.dataset.active = active
    action.classList = `
        group flex items-center gap-2 
        py-1 md:py-0  md:px-8 
        border-b-2 md:border-b-0 md:border-l-4 border-transparent hover:border-l-yellow-200 
        data-[active=true]:border-l-yellow-200 data-[active=true]:border-b-yellow-200
    `

    if (link) action.href = link
    if (onClick) action.addEventListener('click', (e) => {
        e.preventDefault()
        onClick()
    })

    image.src = icon
    image.classList = 'w-4 h-4 md:w-5 md:h-5'

    text.textContent = title
    text.classList = 'hidden lg:block text-sm text-indigo-50 group-hover:text-white group-data-[active=true]:font-semibold'

    action.append(image, text)
    container.appendChild(action)

    if (accordion) {
        const arrow = createHTMLElement('img')
        const options = createHTMLElement('ul')

        arrow.src = '/frontend/src/img/icones/caret-right.svg'
        arrow.height = 16
        arrow.width = 16
        arrow.className = 'group-hover:rotate-90 transition-all duration-200'

        options.className = `hidden
            flex flex-col items-start justify-center pt-6 pl-8 space-y-4
            [&_a]:block [&_a]:cursor-pointer [&_a]:text-indigo-50 [&_a]:text-sm
        `

        accordionOptions.forEach((option) => {
            const li = createHTMLElement('li')
            const link = createHTMLElement('a')

            link.textContent = option.name
            link.href = option.link
            link.className = 'hover:text-yellow-200'

            li.appendChild(link)
            options.appendChild(li)
        })

        action.addEventListener('click', (e) => {
            e.preventDefault()

            options.classList.toggle('hidden')
            arrow.classList.toggle('rotate-90')
        })

        action.appendChild(arrow)
        container.appendChild(options)
    }

    return container
}

export function Sidebar({ size='lg', items=[], changePassword=true }) {
    const containerStyle = {
        'sm': 'md:w-28',
        'lg': 'md:w-28 lg:w-56'
    }
    const sidebar = createHTMLElement('header')
    const smallLogo = createHTMLElement('img')
    const bigLogo = LogoLado()
    const nav = createHTMLElement('nav')
    const navList = createHTMLElement('ul')
    const footerItems = createHTMLElement('div')
    const logout = Item({
        icon: '/frontend/src/img/icones/sign-out.svg',
        title: size === 'lg' ? 'Encerrar sessão': '',
        onClick: () => {
            openDialog({ 
                dialog: AlertDialog({
                    message: 'Você ira encerrar sua sessão e precisará realizar login para entrar novamente.',
                    confirmarButtonName: 'Encerrar',
                    onConfirm: () => signOut()
                }),
                rootId: 'root'
            })
        },
    })

    if (changePassword) {
        const trocarSenha = Item({
            icon: '/frontend/src/img/icones/password.svg',
            title: size === 'lg'? 'Trocar senha' : '',
            active: false,
            link: null,
            onClick: () => {
                console.log('Trocar senha');
            },
        })
        footerItems.appendChild(trocarSenha)
    }

    sidebar.className = `block md:h-screen w-full p-6 md:p-0 box-border flex flex-row md:flex-col ${containerStyle[size]} bg-indigo-950`
    
    smallLogo.src = '/frontend/src/img/logo-icon.svg'
    smallLogo.alt = 'Logo icone Polvo Branca'
    smallLogo.className = 'ml-9 md:pt-12'
    smallLogo.height = 21
    smallLogo.width = 21

    nav.className = 'flex-1 w-full md:py-10'
    navList.className = 'flex md:flex-col h-full gap-6'

    footerItems.className = 'mt-auto flex items-center md:items-start md:flex-col gap-6'

    items.forEach((item) => {
        const sidebarItem = Item({
            icon: item.icon,
            title: size === 'lg' ? item.title : '',
            active: item.active,
            link: item.link,
            onClick: item.onClick,
            accordion: item.accordion,
            accordionOptions: item.accordionOptions
        })
        navList.appendChild(sidebarItem)
    })

    if (size === 'lg') sidebar.appendChild(bigLogo)
    if (size === 'sm') sidebar.appendChild(smallLogo)

    footerItems.appendChild(logout)
    navList.appendChild(footerItems)
    nav.appendChild(navList)
    sidebar.appendChild(nav)

    return sidebar
}