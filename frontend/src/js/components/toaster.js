const button = document.getElementById('toaster-button')

function baseToaster(color, title, message, iconSrc, iconId) {
    const span = createHTMLElement('span')
    const divTitle = createHTMLElement('div')
    const divContent = createHTMLElement('div')
    const h4 = createHTMLElement('h4')
    const p = createHTMLElement('p')
    const button = createHTMLElement('button')
    const closeImg = createHTMLElement('img')
    const iconImg = createHTMLElement('img')

    span.id = 'toaster'
    span.className = `px-5 py-3 rounded-md border-l-4 shadow-md absolute right-4 bottom-6 bg-${color}-100 border-l-${color}-400 flex items-start gap-12`

    divTitle.className = 'flex gap-2'

    h4.className = 'font-semibold text-base'
    h4.textContent = title

    p.className = 'block text-sm pl-7'
    p.textContent = message

    button.id = 'toaster-button'

    closeImg.src = '../../img/icones/x.svg'
    closeImg.alt = 'Icone de X'
    closeImg.className = 'opacity-50'

    iconImg.src = iconSrc
    iconImg.id = iconId

    divTitle.append(iconImg, h4)
    divContent.append(divTitle, p)
    button.appendChild(closeImg)
    span.append(divContent, button)

    return span
}

function successToaster(message, iconHref) {
    const successToaster = baseToaster('emerald', 'Success!', message, iconHref)

    return successToaster
}

if (button) addEventListener.button('click', () => {
    const toaster = document.getElementById('toaster')
    toaster.remove()
})