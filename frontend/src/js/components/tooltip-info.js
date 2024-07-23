export function TooltipInfo({ message='Esta é uma mensagem informativa.' }) {
    const container = createHTMLElement('span')
    const infoButton = createHTMLElement('button')
    const infoIcon = createHTMLElement('img')
    const infoMessage = createHTMLElement('p')

    infoButton.className = 'flex items-center'
    container.className = 'relative w-full'

    infoIcon.src = '/frontend/src/img/icones/question.svg'
    infoIcon.alt = 'Ícone de pergunta arredondada e cinza.'

    infoMessage.textContent = message
    infoMessage.className = 'hidden absolute bottom-3 ml-4 p-2 rounded bg-neutral-100 border border-neutral-300 text-xs text-stone-500'

    infoButton.appendChild(infoIcon)

    container.append(infoMessage, infoButton)

    infoButton.addEventListener('mouseenter', () => {
        infoMessage.classList.remove('hidden');
    });
    infoButton.addEventListener('mouseleave', () => {
        infoMessage.classList.add('hidden');
    });

    infoButton.addEventListener('focus', () => {
        infoMessage.classList.remove('hidden');
    });
    infoButton.addEventListener('blur', () => {
        infoMessage.classList.add('hidden');
    });

    return container
}