export function LogoLado() {
    const container = createHTMLElement('div')
    const smallLogo = createHTMLElement('img')
    const logoLado = createHTMLElement('img')

    container.className = 'md:pt-12 lg:pl-8'

    smallLogo.src = '/frontend/src/img/logo-icon.svg'
    smallLogo.alt = 'Logo icone Polvo Branca'
    smallLogo.className = 'md:pl-9 lg:hidden'

    logoLado.src = '/frontend/src/img/logo-light.svg'
    logoLado.alt = 'Logo de lado Polvo Branca'
    logoLado.className = 'hidden lg:block'

    container.append(logoLado, smallLogo)

    return container
}