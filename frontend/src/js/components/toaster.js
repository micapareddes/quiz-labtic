function baseToaster({ color, title, message, iconSrc, iconAlt }) {
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

    divTitle.className = 'flex items-center gap-2'

    h4.className = 'font-semibold text-base'
    h4.textContent = title

    p.className = 'block text-sm pl-7'
    p.textContent = message

    button.id = 'toaster-button'

    closeImg.src = '/frontend/src/img/icones/x.svg'
    closeImg.alt = 'Icone de X'
    closeImg.style.height = '21px'
    closeImg.style.width = '21px'
    closeImg.className = 'opacity-50 hover:opacity-70'

    iconImg.src = iconSrc
    iconImg.alt = iconAlt
    iconImg.style.height = '21px'
    iconImg.style.width = '21px'

    divTitle.append(iconImg, h4)
    divContent.append(divTitle, p)
    button.appendChild(closeImg)
    span.append(divContent, button)

    return span
}

function successToaster({ message }) {
    const successToaster = baseToaster({
        color: 'emerald', 
        title: 'Sucesso!', 
        message, 
        iconSrc: '/frontend/src/img/icones/check-circle.svg', 
        iconAlt: 'Icone de check circular verde'
    })

    return successToaster
}

function infoToaster({ message }) {
    return baseToaster({ 
        color: 'indigo', 
        title: 'Info', 
        message, 
        iconSrc: '/frontend/src/img/icones/info.svg', 
        iconAlt: 'Icone de informação roxo'
    })
}

function closeToaster() {
    const toasterButton = document.getElementById('toaster-button')
    const toasterId = document.getElementById('toaster')

    toasterButton.addEventListener('click', () => {
        const toaster = document.getElementById('toaster')
        toaster.remove()
    })

    setTimeout(() => {
        toasterId.remove()
    }, 5000)
}
