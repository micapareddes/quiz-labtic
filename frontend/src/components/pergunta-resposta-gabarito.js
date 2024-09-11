import { Title, Text } from './fonts.js'

export function PerguntaRespostaGabarito({ 
    number='num', pergunta='Esta é uma pergunta?', perguntaId='id', alternativas=[],
 }) {
    const container = document.createElement('div')
    const alternativasContainer = document.createElement('div')

    container.id = perguntaId
    alternativasContainer.className = 'space-y-5'

    alternativas.forEach((alt, index) => {
        const bigContainer = document.createElement('div')
        const container = document.createElement('div')
        const icon = document.createElement('img')
        const content = document.createElement('p')
        const iconAlternativas = {
            0: '/frontend/src/img/icones/a.svg',
            1: '/frontend/src/img/icones/b.svg',
            2: '/frontend/src/img/icones/c.svg',
            3: '/frontend/src/img/icones/d.svg',
        }
        const letra = {
            0: 'a',
            1: 'b',
            2: 'c',
            3: 'd',
        }
        icon.src = iconAlternativas[index]

        container.id = `alternativa-${alt._id}`
        container.setAttribute('letra', letra[index])
        container.className = 'relative inline-flex block space-x-2'
        if (alt.isCorreta) container.classList.add('bg-emerald-100')
        
        content.textContent = alt.conteudo
        content.className = 'text-stone-700'

        container.append(
            icon,
            content
        )
        bigContainer.appendChild(container)
        alternativasContainer.appendChild(bigContainer)
    })

    container.append(
        Title({
            title: `Pergunta ${number}`, 
            size: 'xl',
            tone: 's-700', 
            as: 'h3',
            className: 'mb-2',
        }),
        Text({
            text: pergunta,
            tone: 's-700',
            size: 'text-lg',
            className: 'mb-5'
        }),
        alternativasContainer
    )

    return container
}