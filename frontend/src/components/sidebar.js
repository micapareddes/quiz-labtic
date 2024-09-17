import { AlertDialog, openDialog } from './dialog.js'
import { LogoLado } from './logo-lado.js'
import { signOut } from '../auth/singOut.js'
import { removeOriginalValuesFromStorage } from '/frontend/src/pages/admin/edicao/functions/removeOriginalValuesFromStorage.js'

function Item({ 
    phosphor='question', title, link=null, onClick=null, accordion=false, accordionOptions=[], active=false 
}) {
    const container = document.createElement('li')
    const action = link ? document.createElement('a') : document.createElement('button')
    const icon = document.createElement('i')
    const text = document.createElement('p')

    container.className = 'group'

    action.dataset.active = active
    action.classList = `
        group flex items-center gap-2 
        py-1 md:py-0  md:px-8 
        border-b-2 md:border-b-0 md:border-l-4 border-transparent hover:border-l-yellow-300 
        data-[active=true]:border-l-yellow-200 data-[active=true]:border-b-yellow-200
    `

    if (link) action.href = link
    if (onClick) action.onclick = onClick

    icon.classList = `ph ph-${phosphor} text-indigo-50 group-hover:text-yellow-200 text-xl`

    text.textContent = title
    text.classList = 'hidden lg:block text-sm text-indigo-50 group-hover:text-yellow-200 group-data-[active=true]:font-semibold'

    action.append(icon, text)
    container.appendChild(action)

    if (accordion) {
        const arrow = document.createElement('i')
        const options = document.createElement('ul')

        arrow.className = 'ph ph-caret-right text-indigo-50 font-base group-hover:rotate-90 transition-all duration-200'

        options.className = `hidden
            flex flex-col items-start justify-center pt-6 pl-8 space-y-4
            [&_a]:block [&_a]:cursor-pointer [&_a]:text-indigo-50 [&_a]:text-sm
        `

        accordionOptions.forEach((option) => {
            const li = document.createElement('li')
            const link = document.createElement('a')

            link.textContent = option.name
            link.href = option.linkPainel

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
    const sidebar = document.createElement('header')
    const smallLogo = document.createElement('img')
    const bigLogo = LogoLado()
    const nav = document.createElement('nav')
    const navList = document.createElement('ul')
    const footerItems = document.createElement('div')
    const logout = Item({
        phosphor: 'sign-out',
        title: size === 'lg' ? 'Encerrar sessão': '',
        onClick: () => {
            openDialog(
                AlertDialog({
                    message: 'Você ira encerrar sua sessão e precisará realizar login para entrar novamente.',
                    confirmarButtonName: 'Encerrar',
                    onConfirm: () => {
                        removeOriginalValuesFromStorage()
                        signOut()
                    }
                })
            )
        },
    })

    if (changePassword) {
        const trocarSenha = Item({
            phosphor: 'password',
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
            phosphor: item.icon,
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