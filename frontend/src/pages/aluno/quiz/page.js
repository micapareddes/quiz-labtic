// Functions
import { ROUTES } from '/frontend/src/utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { getUrlParam } from '/frontend/src/pages/admin/edicao/functions/getUrlParam.js'

// Components
import { SidebarAluno } from '../components/sidebar.js'
import { Step2Page } from './components/step-2-page.js'
import { Step1Page } from './components/step-1-page.js'

async function QuizPage() {
    const currentStep = getUrlParam('step')
    if (!currentStep) navigateTo(ROUTES.ERROR404)
    verifyUserAccess('aluno')
    const root = document.getElementById('root')
    const sidebarSize = currentStep === '1' ? 'lg' : 'sm'
    const rootClass = currentStep === '1' ? 'root-container' : 'small-root-container'
    root.className = rootClass
    root.prepend(
        SidebarAluno(sidebarSize)
    )
    const step = {
        '1': Step1Page,
        '2': Step2Page,
    }
    step[currentStep]()
}
QuizPage()