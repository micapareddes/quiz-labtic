import { Sidebar } from './components/sidebar.js'
import { QuestionSidecard, AttemptsSidecard } from './components/sidecard.js'

const sidebarSection = document.getElementById('sidebar')
const sidecarSection = document.getElementById('sidecar')

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

sidebarSection.append(
    Sidebar({ size: 'lg', items: items }),
    Sidebar({ size: 'sm', items: items }),
)

sidecarSection.append(    
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
