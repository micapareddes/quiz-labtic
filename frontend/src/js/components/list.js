import { Text } from "./fonts.js"
import { Tag } from "./tag.js"
import { EditRemoveActionButtons } from "./edit-remove.js"
import { Button } from "./button.js"

export function ListItemBox({ content }) {
    const container = createHTMLElement('div')
    container.className = 'bg-neutral-100 shadow-base border border-neutral-200 rounded-xl px-5 py-4 w-full justify-start items-center'
    if (content) container.appendChild(content)

    return container
}

export function ListItemBoxWithTitle({ title='Título', content=null }) {
    const titulo = createHTMLElement('p')
    titulo.textContent = title
    titulo.className = 'text-stone-900 text-base'

    if (content) content.prepend(titulo)

    return ListItemBox({ content: content ? content : titulo })
}

export function QuizListItem({ name='Quiz', endDate='00 de Mes', type='exc' }) {
    const quizType = {
        'sim': 'Simulado',
        'prova': 'Prova',
        'exc': 'Exercicio'
    }
    const container = createHTMLElement('div')
    const date = Text({
        text: endDate,
        size: 'sm',
        tone: 's-600'
    })
    const typeTag = Tag({ title: quizType[type] })

    container.className = 'grid-list-item justify-between items-center'
    container.append(date, typeTag)

    return ListItemBoxWithTitle({ title: name, content: container})
}

export function EditQuizListItem({ name='Quiz', onEdit, onRemove}) {
    const container = createHTMLElement('div')

    container.className = 'flex flex-row justify-between items-center'
    container.appendChild(
        EditRemoveActionButtons({
            onEdit, 
            onRemove
        }))

    return ListItemBoxWithTitle({ title: name, content: container })
}

export function RegisterListItem({ name='Text', registerLink }) {
    const container = createHTMLElement('div')

    container.className = 'flex flex-row justify-between items-center'
    container.appendChild(Button({
        title: 'Cadastrar novo',
        variant: 'ghost',
        size: 'md',
        link: registerLink,
    }))

    return ListItemBoxWithTitle({ title: name, content: container })
}

export function StudentGradeListItem({ studentName='Nome', answerLink, grade='x' }) {
    const container = createHTMLElement('div')
    const answerContainer = createHTMLElement('div')

    container.className = 'flex flex-row justify-between items-center'

    answerContainer.className = 'flex flex-row gap-5'
    answerContainer.append(
        Button({
            title: 'Ver Respostas',
            variant: 'ghost',
            size: 'sm',
            link: answerLink,
        }),  
        Text({
            as: 'span',
            text: grade + ' / 10',
            size: 'sm',
            tone: 's-600',
        })
    )

    container.appendChild(answerContainer)

    return ListItemBoxWithTitle({ title: studentName, content: container })
}