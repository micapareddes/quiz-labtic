function Heading({ title='Titulo', subtitle='', goBack=false, onGoBack=null }) {
    const heading = createHTMLElement('div')
    const eTitle = createHTMLElement('h1')
    const eSubtitle = createHTMLElement('h2')

    heading.className = 'grid'

    eTitle.textContent = title
    eTitle.className = 'text-3xl font-bold text-stone-900'

    eSubtitle.textContent = subtitle
    eSubtitle.className = 'text-lg text-stone-700 mt-2'

    heading.append(eTitle, eSubtitle)

    if (goBack) {
        heading.classList.add('grid-heading', 'items-start')

        const goBackButton = createHTMLElement('button')
        const leftArrow = createHTMLElement('img')

        leftArrow.src = '/frontend/src/img/icones/caret-left.svg'

        goBackButton.className = 'row-span-2 mt-1 mr-4'
        goBackButton.appendChild(leftArrow)

        heading.prepend(goBackButton)

        goBackButton.addEventListener('click', () => {
            onGoBack()
        })
    }
    
    return heading
}