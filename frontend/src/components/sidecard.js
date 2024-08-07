import { Button } from './button.js'
import { Card } from './card.js'

export function QuestionItem(
    { question='Bold', answer='Regular', color='neutral' }
) {
    const colorStyle = {
        'neutral': ' text-stone-700',
        'red': 'text-red-500',
        'green': 'text-emerald-600'
    }

    const container = document.createElement('div')
    const questionElement = document.createElement('p')
    const answerElement = document.createElement('p')

    container.className = 'flex flex-row justify-between w-40'

    questionElement.textContent = question
    questionElement.className = 'text-base font-semibold text-stone-700'

    answerElement.textContent = answer
    answerElement.className = `text-base ${colorStyle[color]}`

    container.append(questionElement, answerElement)

    return container
}

export function AttemptItem({ attemptNumber, grade, answerLink, disabledButton=false }) {
    const container = document.createElement('div')
    const attemptNumberElement = document.createElement('p')
    const gradeElement = document.createElement('p')
    const seeAnswerButton = Button({
        variant: 'ghost',
        title: 'Gabarito',
        link: answerLink,
        disabled: disabledButton,
    })

    container.className = 'flex flex-row w-60 justify-between'

    attemptNumberElement.textContent = attemptNumber
    attemptNumberElement.className = 'text-base text-stone-700'

    gradeElement.textContent = grade + ' / 10'
    gradeElement.className = 'text-base font-semibold text-stone-700'

    container.append(attemptNumberElement, gradeElement, seeAnswerButton)

    return container
}

export function SidecardBoxWithTitle({ title, titleBold, content }) {
    const titulo = document.createElement('h5')

    titulo.textContent = title
    titulo.className = `text-lg text-stone-700 ${ titleBold && 'font-bold' } mb-8 text-center`

    content.prepend(titulo)

    return Card({ size: 'lg', content })
}

export function QuestionSidecard({ 
    questions=[], title="Respostas", titleIsGrade=false, buttonVariant, buttonName, disabledButton=false, onClick
}) {
    const container = document.createElement('div')
    const perguntasContainer = document.createElement('div')
    const button = Button({ 
        variant: buttonVariant,
        title: buttonName,
        size:'md', 
        disabled: disabledButton,
        onClick,
    })

    container.className = 'flex flex-col items-center'
    perguntasContainer.className = 'flex flex-col gap-4 mb-8'

    questions.forEach((pergunta) => {
        const item = QuestionItem({ 
            question: pergunta.question,
            answer: pergunta.answer,
            color: pergunta.color
        })
        perguntasContainer.appendChild(item)
    })

    container.append(perguntasContainer, button)

    return SidecardBoxWithTitle({
        title,
        titleBold: titleIsGrade,
        content: container
    })
}

export function AttemptsSidecard({ attempts=[] }) {
    const attemptsContainer = document.createElement('div')
    const noAttemptsContainer = document.createElement('div')
    const noAttemptsMessage = document.createElement('p')

    attemptsContainer.className = 'space-y-4'

    noAttemptsContainer.className = 'h-screen flex flex-col'

    noAttemptsMessage.textContent = 'Você não possui nenhuma tentativa.'
    noAttemptsMessage.className = 'text-sm text-stone-400 text-center max-w-32 mt-auto mb-auto'

    attempts.forEach((attempt) => {
        attemptsContainer.appendChild(AttemptItem({
            attemptNumber: attempt.attemptNumber + 'º Tentativa',
            grade: attempt.grade,
            answerLink: attempt.answerLink,
            disabledButton: attempt.disabledLinkButton,
        }))
    })

    noAttemptsContainer.appendChild(noAttemptsMessage)

    const content = attempts.length === 0 ? noAttemptsContainer : attemptsContainer

    return SidecardBoxWithTitle({
        title: 'Suas Tentativas',
        content,
    })
}