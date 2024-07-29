export function Empty(message) {
    const container = createHTMLElement('div')
    const icon = createHTMLElement('img')
    const messageContainer = createHTMLElement('p')

    container.className = 'flex h-screen flex-col items-center justify-center'

    icon.src = '../../img/no-data-100.svg'
    icon.alt = 'Duas pranchetas sobrepostas com clipes lilas.'
    icon.className = 'w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96'

    messageContainer.textContent = message
    messageContainer.className = 'px-5 py-4 text-stone-400 text-lg md:text-xl lg:text-2xl block text-center mt-6'

    container.appendChild(icon)
    container.appendChild(messageContainer)

    return container
}