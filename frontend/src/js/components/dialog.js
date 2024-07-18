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

export function ActionDialog({ title, message, confirmarButtonName }) {
    return constructorDialog({ 
        title, 
        message, 
        confirmarButtonName, 
        onConfirm, 
        color: 'indigo' 
    })
}

export function openDialog({ dialog, rootId }) {
    const root = document.getElementById(rootId)
    root.appendChild(dialog)
}