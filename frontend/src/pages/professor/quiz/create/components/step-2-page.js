// Functions
import { ROUTES } from '/frontend/src/utils/routes.js'
import { handleGuardarRascunho } from '../functions/handleGuardarRascunho.js'
import { infoQuizValidation } from '/frontend/src/validations/infoQuizValidation.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { goBack } from '/frontend/src/functions/goBack.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { painelItems } from '/frontend/src/pages/professor/components/sidebar-professor.js'
import { AlertDialog, openDialog } from '/frontend/src/components/dialog.js'
import { TextInput } from '/frontend/src/components/text-input.js'
import { Select } from '/frontend/src/components/select.js'
import { DataInput } from '/frontend/src/components/data-input.js'
import { Question } from '/frontend/src/components/question.js'
import { Button } from '/frontend/src/components/button.js'
import { ErrorMessage } from '/frontend/src/components/error-message.js'

export async function Step2Page() {
    const step = localStorage.getItem('step')
    if (!step) navigateTo(ROUTES.ERROR404)

    const main = document.getElementById('main')
    const form = document.createElement('form')
    const buttonsContainer = document.createElement('div')
    const { nome, disciplina } = JSON.parse(localStorage.getItem('infos'))
    console.log(nome, disciplina);
    

    form.className = 'mt-10 md:px-11 space-y-16'
    buttonsContainer.className = 'gap-4 flex justify-end'
    for (let i =1; i <= 10; i++) {
        form.appendChild(
            Question({ number: i })
        )
    }
    buttonsContainer.append(
        Button({
            variant: 'outline', 
            size:'md', 
            title: 'Guardar como rascunho', 
            type: 'button', 
            onClick: () => {}, 
            id: 'button-id',
        }),        
        Button({
            variant: 'primary', 
            size:'md', 
            title: 'Postar', 
            type: 'button', 
            onClick: () => {}, 
            id: 'button-id',
        }),
    )
    form.appendChild(buttonsContainer)
    main.append(
        Heading({
            goBack: true, 
            title: nome, 
            subtitle: disciplina.nome,
            onGoBack: () => navigateTo('/frontend/src/pages/professor/quiz/create/index.html?step=1')
        }),
        form
    )
}