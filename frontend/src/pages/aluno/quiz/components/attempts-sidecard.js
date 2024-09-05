import { SidecardBoxWithTitle } from "/frontend/src/components/sidecard.js"

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
        }))
    })

    noAttemptsContainer.appendChild(noAttemptsMessage)

    const content = attempts.length === 0 ? noAttemptsContainer : attemptsContainer

    return SidecardBoxWithTitle({
        title: 'Suas Tentativas',
        content,
    })
}