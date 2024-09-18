// Functions
import { ROUTES } from '/frontend/src/utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { getUrlParam } from '/frontend/src/functions/getUrlParam.js'

// Components
import { SidebarAluno } from '../components/sidebar.js'
import { Step2Page } from './components/step-2-page.js'
import { Step1Page } from './components/step-1-page.js'

async function QuizPage() {
    const currentStep = getUrlParam('step')
    if (!currentStep) navigateTo(ROUTES.ERROR404)
    verifyUserAccess('aluno')

    if (currentStep === '1') root.prepend(SidebarAluno())
    const step = {
        '1': Step1Page,
        '2': Step2Page,
    }
    step[currentStep]()
}
QuizPage()