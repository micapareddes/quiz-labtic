import { Title } from "./fonts.js"

export function Heading({ title='Titulo', subtitle='', subtitleSize='lg', goBack=false, onGoBack=null }) {
    const heading = createHTMLElement('div')
    const eTitle = Title({ 
        title,
        size: '3xl',
        tone: 's-900',
    })
    const eSubtitle = Title({ 
        subtitle,
        size: subtitleSize,
        tone: 's-700',
        bold: 'regular'
    })

    heading.className = 'grid'
    heading.append(eTitle, eSubtitle)

    if (goBack) {
        heading.classList.add('grid-heading', 'items-start')

        const goBackButton = createHTMLElement('button')
        const leftArrow = createHTMLElement('img')

        leftArrow.src = '/frontend/src/img/icones/caret-left.svg'

        goBackButton.className = 'row-span-2 mt-1 mr-4 hover:bg-neutral-200 rounded-md'
        goBackButton.appendChild(leftArrow)

        heading.prepend(goBackButton)

        goBackButton.addEventListener('click', () => {
            onGoBack()
        })
    }
    
    return heading
}