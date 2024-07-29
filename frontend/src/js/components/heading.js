import { Title } from "./fonts.js"

export function Heading({ title='Titulo', subtitle='', subtitleSize='lg', goBack=false, onGoBack=null }) {
    const heading = createHTMLElement('div')
    const eTitle = Title({ 
        title,
        size: '3xl',
        tone: 's-900',
    })
    const eSubtitle = Title({ 
        title: subtitle,
        size: subtitleSize,
        tone: 's-700',
        bold: 'regular',
    })

    heading.className = 'w-full'
    heading.append(eTitle, eSubtitle)

    if (goBack) {
        heading.classList.add('grid-heading', 'items-center', 'justify-start')
        eSubtitle.classList.add('row-start-2', 'col-start-2')

        const goBackButton = createHTMLElement('button')
        const leftArrow = createHTMLElement('img')
        const div = createHTMLElement('div')

        div.className = 'flex justify-start w-8 h-8 mr-3'

        leftArrow.src = '/frontend/src/img/icones/caret-left.svg'
        leftArrow.height = 32
        leftArrow.width = 32

        goBackButton.className = 'row-span-2 hover:bg-neutral-200 rounded-md p-1'
        goBackButton.appendChild(leftArrow)
        div.appendChild(goBackButton)

        heading.prepend(div)

        goBackButton.addEventListener('click', () => {
            onGoBack()
        })
    }
    
    return heading
}