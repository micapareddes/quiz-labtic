import { Button } from './components/button.js'
import { Sidebar } from './components/sidebar.js'
import { QuestionSidecard, AttemptsSidecard } from './components/sidecard.js'
import { Tag } from './components/tag.js'
import { Heading } from './components/heading.js'
import { TooltipInfo } from './components/tooltip-info.js'
import { 
    ListItemBox, ListItemBoxWithTitle, QuizListItem, EditQuizListItem, RegisterListItem, StudentGradeListItem 
} from './components/list.js'

// Botões
const primary = document.getElementById('button-primary')
const outline = document.getElementById('button-outline')
const othersButton = document.getElementById('button-others')

primary.append(
    Button({}),
    Button({ size: 'sm' }),
    Button({ size: 'lg' }),
    Button({ size: 'full' }),
)
outline.append(
    Button({ variant: 'outline' }),
    Button({ variant: 'outline', size: 'sm' }),
    Button({ variant: 'outline', size: 'lg' }),
    Button({ variant: 'outline', size: 'full' }),
)
othersButton.append(
    Button({ size: 'lg', destructive: true }),
    Button({ destructive: true }),
    Button({ size: 'sm', destructive: true }),
    Button({ size: 'lg', variant: 'outline', destructive: true }),
    Button({ variant: 'outline', destructive: true }),
    Button({ size: 'sm', variant: 'outline', destructive: true }),
    Button({ size: 'lg', variant: 'ghost', destructive: true }),
    Button({ variant: 'ghost', destructive: true }),
    Button({ size: 'sm', variant: 'ghost', destructive: true }),
    Button({ variant: 'ghost', size: 'lg' }),
    Button({ variant: 'ghost', size: 'md' }),
    Button({ variant: 'ghost', size: 'sm' }),
)

// Sidebar
const sidebar = document.getElementById('sidebar')
const items = [
    {
        icon: '/frontend/src/img/icones/house.svg',
        title: 'Dashboard',
        link: '/',
        active: true,
    },{
        icon: '/frontend/src/img/icones/books.svg',
        title: 'Disciplinas',
        link: '/',
        accordion: true,
        accordionOptions: [
            {
                name: 'Aluno',
                link: '/'
            },{
                name: 'Professor',
                link: '/'
            },
        ],
    },{
        icon: '/frontend/src/img/icones/books.svg',
        title: 'Disciplinas',
        link: '/',
        accordion: true,
        accordionOptions: [
            {
                name: 'Aluno',
                link: '/'
            },{
                name: 'Professor',
                link: '/'
            },
        ],
    },
]
sidebar.append(
    Sidebar({ size: 'lg', items: items }),
    Sidebar({ size: 'sm', items: items }),
)

// Sidecard
const sidecar = document.getElementById('sidecar')
const respostas = [
    {
        question: 'Pergunta 1',
        answer: 'A',
    },{
        question: 'Pergunta 2',
        answer: 'A',
    },{
        question: 'Pergunta 3',
        answer: 'A',
    },{
        question: 'Pergunta 4',
        answer: 'A',
    },{
        question: 'Pergunta 5',
        answer: 'A',
    },{
        question: 'Pergunta 6',
        answer: 'A',
    },{
        question: 'Pergunta 7',
        answer: 'A',
    },{
        question: 'Pergunta 8',
        answer: 'A',
    },{
        question: 'Pergunta 9',
        answer: 'A',
    },{
        question: 'Pergunta 10',
        answer: 'A',
    },
]
const gabarito = [
    {
        question: 'Pergunta 1',
        answer: 'A',
        color: 'green'
    },{
        question: 'Pergunta 2',
        answer: 'A',
        color: 'green'
    },{
        question: 'Pergunta 3',
        answer: 'A',
        color: 'red'

    },{
        question: 'Pergunta 4',
        answer: 'A',
        color: 'green'

    },{
        question: 'Pergunta 5',
        answer: 'A',
        color: 'green'

    },{
        question: 'Pergunta 6',
        answer: 'A',
        color: 'green'

    },{
        question: 'Pergunta 7',
        answer: 'A',
        color: 'red'

    },{
        question: 'Pergunta 8',
        answer: 'A',
        color: 'green'

    },{
        question: 'Pergunta 9',
        answer: 'A',
        color: 'green'

    },{
        question: 'Pergunta 10',
        answer: 'A',
        color: 'green'

    },
]
sidecar.append(    
    QuestionSidecard({
    questions: respostas,
    title: 'Respostas',
    buttonName: 'Entregar'
    }),
    QuestionSidecard({
        questions: gabarito,
        title: 'Nota 8',
        titleIsGrade: true,
        buttonName: 'Entregue',
        buttonVariant: 'outline',
        disabledButton: true,

    }),
    AttemptsSidecard({
        attempts: [
            {
                attemptNumber: '1',
                grade: '8'
            },{
                attemptNumber: '2',
                grade: '8'
            },{
                attemptNumber: '3',
                grade: '10'
            },

        ]
    }),
    AttemptsSidecard({})
)

// List
const list = document.getElementById('list')
list.append(
    ListItemBox({}),
    ListItemBoxWithTitle({}),
    QuizListItem({
        name: 'Simulado de Poções Básicas e Avançadas',
        endDate: '1 de Janeiro',
        type: 'exc'
    }),
    QuizListItem({
        name: 'Prova de Poções Básicas',
        endDate: '17 de Fevereiro',
        type: 'exc'
    }),
    EditQuizListItem({}),
    RegisterListItem({ name: 'Professor' }),
    StudentGradeListItem({})
)

// Others
const others = document.getElementById('others')
others.append(
    Tag({}),
    Heading({ goBack: true, subtitle: 'Subtitle' }),
    Heading({ subtitle: 'Subtitle' }),
    TooltipInfo({}),
)