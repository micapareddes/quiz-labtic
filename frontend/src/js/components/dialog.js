import { Button } from './button.js'

function constructorDialog({ title, message, confirmarButtonName = 'Confirmar', onConfirm, color='neutral' }) {
    const container = createHTMLElement('dialog')
    const div = createHTMLElement('div')
    const buttonsContainer = createHTMLElement('div')
    const h4 = createHTMLElement('h4')
    const p = createHTMLElement('p')
    const cancelarButton = createHTMLElement('button')
    const confirmarButton = createHTMLElement('button')

    container.className = 'absolute left-0 top-0 bg-indigo-950 bg-opacity-50 backdrop-blur-sm h-screen w-screen flex items-center justify-center'
    container.id = 'dialog'

    div.className = 'bg-neutral-50 rounded-3xl px-6 py-8'

    buttonsContainer.className = 'text-end'

    h4.className = 'text-xl lg:text-2xl font-semibold text-stone-900 mb-4'
    h4.textContent = title

    p.className = 'mb-6 text-stone-700 text-base w-64 md:w-[350px] lg:w-[479px]'
    p.textContent = message

    cancelarButton.className = 'px-6 py-2 border border-neutral-400 text-neutral-500 rounded-md mr-4'
    cancelarButton.id = 'cancelar-button'
    cancelarButton.textContent = 'Cancelar'

    // fecha dialog quando clica em botão de cancelar
    cancelarButton.addEventListener('click', () => {
        container.remove()
    })
    
    confirmarButton.className = `px-6 py-2 border rounded-md text-neutral-50 bg-${color}-500`
    confirmarButton.id = 'confirmar-button'
    confirmarButton.textContent = confirmarButtonName

    // roda função passada via props
    confirmarButton.addEventListener('click', () => {
        container.remove()
        onConfirm()
    })

    buttonsContainer.append(cancelarButton, confirmarButton)
    div.append(h4, p, buttonsContainer)
    container.appendChild(div)

    return container
}

export function AlertDialog({ message, confirmarButtonName, onConfirm }) {
    return constructorDialog({ 
        title: 'Tem certeza?', 
        message, 
        confirmarButtonName, 
        onConfirm, 
        color: 'red' 
    })
}

export function ActionDialog({ title, message, confirmarButtonName, onConfirm }) {
    return constructorDialog({ 
        title, 
        message, 
        confirmarButtonName, 
        onConfirm, 
        color: 'indigo' 
    })
}

export function SuccessDialog({ 
    title='Título', message='Mensagem do dialog', buttonName='Redirecionar', link,
}) {
    const container = createHTMLElement('dialog')
    const dialog = createHTMLElement('dialog')
    const headingContainer = createHTMLElement('header')
    const icon = createHTMLElement('img')
    const dialogTitle = createHTMLElement('h4')
    const dialogMessage = createHTMLElement('p')
    const closeButton = createHTMLElement('button')
    const redirectButton = Button({
        variant: 'ghost',
        title: buttonName,
        link: link,
    })

    container.className = 'absolute left-0 top-0 bg-indigo-950 bg-opacity-50 backdrop-blur-sm h-screen w-screen flex items-center justify-center'

    dialog.className = 'bg-neutral-50 rounded-3xl px-6 py-8'

    headingContainer.className = 'flex flex-col gap-3'

    icon.src = '/frontend/src/img/icones/check-circle.svg'
    icon.height = 32
    icon.width = 32

    dialogTitle.textContent = title
    dialogTitle.className = 'text-xl lg:text-2xl font-semibold text-stone-900 mb-4'

    dialogMessage.textContent = message
    dialogMessage.className = 'mb-6 text-stone-700 text-base w-64 md:w-[350px] lg:w-[479px]'

    closeButton.src = '/frontend/src/img/icones/x.svg'
    closeButton.width = 21
    closeButton.height = 21
    closeButton.className = 'opacity-20'

    headingContainer.append(icon, dialogTitle)
    dialog.append(headingContainer, dialogMessage, redirectButton)
    container.appendChild(dialog)

    return container
}

export function openDialog(dialog) {
    const root = document.getElementById('root')
    root.appendChild(dialog)
}