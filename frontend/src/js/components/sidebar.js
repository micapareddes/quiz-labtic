function sidebarLinkItem({ img, imgAlt, title, href, active=false }) {
    const li = createHTMLElement('li')
    const a = createHTMLElement('a')
    const image = createHTMLElement('img')
    const p = createHTMLElement('p')

    li.classList = 'flex items-center md:items-start md:flex-col h-full gap-6 justify-end'

    a.dataset.active = active
    a.href = href
    a.classList = 'group flex items-center gap-2 py-1 md:py-0  md:px-8 border-b-2 md:border-b-0 md:border-l-4 border-transparent hover:border-l-yellow-200 data-[active=true]:border-l-yellow-200 data-[active=true]:border-b-yellow-200'

    image.src = img
    image.alt = imgAlt
    image.classList = 'w-4 h-4 md:w-5 md:h-5'

    p.textContent = title
    p.classList = 'hidden lg:block text-sm text-indigo-50 group-hover:font-semibold group-data-[active=true]:font-semibold'

    a.append(image, p)
    li.appendChild(a)

    return li
}

function sidebarButtonItem({}) {}

function sidebarAccordion({}) {

}

function sidebar({}) {
    const sidebar = createHTMLElement('header')
    const logoContainer = createHTMLElement('div')
    const logoLadoImg = createHTMLElement('img')
    const logoIconImg = createHTMLElement('img')
    const nav = createHTMLElement('nav')
    const itemsList = createHTMLElement('ul')

    sidebar
}

function openEncerrarSessao() {

}