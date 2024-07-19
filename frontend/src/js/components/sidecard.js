import { Button } from './button.js'

function Item({ boldValue='Bold', regularValue='Regular', color='neutral' }) {
    const colorStyle = {
        'neutral': ' text-stone-700',
        'red': 'text-red-500',
        'green': 'text-emerald-600'
    }

    const container = createHTMLElement('div')
    const bold = createHTMLElement('p')
    const regular = createHTMLElement('p')

    container.className = 'flex flex-row justify-between w-40'

    bold.textContent = boldValue
    bold.className = 'text-base font-semibold text-stone-700'

    regular.textContent = regularValue
    regular.className = `text-base ${colorStyle[color]}`

    container.append(bold, regular)

    return container
}

function constructorSidecard({ titulo='Título', tituloBold=false, content }) {
    const container = createHTMLElement('div')
    const title = createHTMLElement('h5')

    container.className = 'flex flex-col items-center min-w-80 bg-neutral-100 rounded-3xl'

    title.textContent = titulo
    title.className = `text-lg text-stone-700 ${tituloBold && 'font-bold'}`

    container.append(title, content)

    return container
}

export function QuestionSidecard({ 
    perguntas, titulo="Título",   
}) {
    const container = createHTMLElement('div')
    const title = createHTMLElement('h5')
    const contentContainer = createHTMLElement('div')
    const button = Button({ 
        variant: buttonVariant,
        title: buttonName,
        size:'md', 
        disabled: disabledButton,
        onClick,
    })

    container.className = 'flex flex-col  min-w-80 bg-neutral-100 rounded-3xl'

    title.textContent = titulo
    title.className = `text-lg text-stone-700 ${ tituloBold && 'font-bold'}`

    contentContainer.className = 'flex flex-col gap-4'
    content.forEach(line => {
        const lineItem = Item({ 
            boldValue: line.boldValue,
            regularValue: line.regularValue,
            color: line.color
        })

    })
}