// Functions
import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { saveWindowPath } from '/frontend/src/functions/saveWindowPath.js'
import { getUrlParam } from '../../admin/edicao/functions/getUrlParam.js'
import { goBack } from '/frontend/src/functions/goBack.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { SidebarAluno } from '/frontend/src/pages/aluno/components/sidebar.js'
import { Empty } from '/frontend/src/components/empty.js'
import { QuizTable } from '../components/quiz-table.js'

async function PageDashboard() {
    try {
        verifyUserAccess('aluno')
        const root = document.getElementById('root')
        const main = document.getElementById('main')
        const id = getUrlParam('id')
        const data = await makeRequest({
            url: API_ENDPOINTS.GET_QUIZ_INFO_BY_DISCIPLINA_ID(id), 
            method:'GET', 
            token: localStorage.getItem('accessToken')
        })
        const quizzes = data.quizes
        
        root.prepend(SidebarAluno())
        main.prepend(
            Heading({ 
                goBack: true, 
                onGoBack: () => goBack(),
                title: data.nome, 
                subtitle: 'Quizzes',
                subtitleSize: 'lg'
            })
        )

        if (quizzes.length === 0) {
            main.appendChild(
                Empty('Não há nenhum quiz cadastrado ainda.')
            )
        } else {
            main.appendChild(
                QuizTable(quizzes)
            )
        }
    
        saveWindowPath()
    } catch (error) {
        console.log(error);
        alert('Algo deu errado... Encerre a sessão e tente novamente.')
        
    }
}
PageDashboard()