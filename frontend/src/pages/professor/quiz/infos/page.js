// Functions
import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { getUrlParam } from '/frontend/src/pages/admin/edicao/functions/getUrlParam.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { saveWindowPath } from '/frontend/src/functions/saveWindowPath.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { SidebarProfessor } from '/frontend/src/pages/professor/components/sidebar-professor.js'
import { Empty } from '/frontend/src/components/empty.js'
import { Button } from '/frontend/src/components/button.js'
import { Title } from '/frontend/src/components/fonts.js'
import { QuizInfo } from '/frontend/src/components/quiz-info.js'
import { Text } from '/frontend/src/components/fonts.js'
import { StudentGradeListItem } from './components/student-grade-list.js'

async function QuizInfoPage() {
try {
    verifyUserAccess('professor')
    const quizId = getUrlParam('id')
    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const content = document.createElement('div')
    const alunosContainer = document.createElement('div')
    const navAlunosContainer = document.createElement('nav')
    const listaAlunosContainer = document.createElement('ul')
    const { alunos, data_fim, data_inicio, disciplina_nome, orientacao, tempo, tentativas, titulo } = await makeRequest({ 
        url: API_ENDPOINTS.GET_QUIZ_INFO_FOR_PROFESSOR_BY_ID(quizId), 
        method: 'GET', 
        token: localStorage.getItem('accessToken'), 
    })
    
    content.className = 'ml-11 mt-8 space-y-10'
    alunosContainer.className = 'space-y-3'
    listaAlunosContainer.className = 'space-y-2'
    if (alunos.length === 0) {
        const empty = document.createElement('div')
        empty.className = 'mt-14'
        empty.appendChild(
            Text({
                text: 'Nenhum aluno respondeu ainda :(',
                tone: 's-400'
            })
        )
        navAlunosContainer.appendChild(empty)
    } else {
        alunos.forEach((aluno) => {
            listaAlunosContainer.append(
                StudentGradeListItem({ 
                    studentName: aluno.aluno_id.nome, 
                    answerLink: ROUTES.PROFESSOR.QUIZ.GABARITO({
                        quiz: quizId,
                        tentativa: aluno._id
                    }), 
                    grade: aluno.nota 
                })
            )
            navAlunosContainer.appendChild(listaAlunosContainer)
        })
    }
    
    root.prepend(SidebarProfessor())
    alunosContainer.append(
        Title({
            title: 'Alunos que responderam',
            size: 'lg', 
            tone: 's-700', 
            bold: 'semibold', 
            as: 'h4', 
        }),
        navAlunosContainer,
    )
    content.append(
        QuizInfo({
            orientacao,
            tentativas,
            tempo,
            dataFim: data_fim,
            dataInicio: data_inicio,
        }),
        alunosContainer
    )
    main.append(
        Heading({ 
            goBack: true, 
            title: titulo, 
            subtitle: disciplina_nome,
            subtitleSize: 'lg'
        }),
        content
    )
} catch (error) {
    
}
} QuizInfoPage()