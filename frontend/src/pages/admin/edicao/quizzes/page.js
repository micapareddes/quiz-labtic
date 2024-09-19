// Functions
import { API_ENDPOINTS, ROUTES } from '/frontend/src/utils/routes.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { getUrlParam } from '/frontend/src/functions/getUrlParam.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
// Components
import { SidebarAdmin } from '/frontend/src/pages/admin/components/sidebar-admin.js'
import { Heading } from '/frontend/src/components/heading.js'
import { Button } from '/frontend/src/components/button.js'
import { InfoQuizForm } from '/frontend/src/components/info-quiz-form.js'

async function EditQuizPage() {
try {
    verifyUserAccess('admin')
    const id = getUrlParam('id')
    if (!id) navigateTo(ROUTES.ADMIN.PAINEL.DISCIPLINAS)

    const root = document.getElementById('root')
    const main = document.getElementById('main')
    const form = document.createElement('form')
    const quiz = await makeRequest({
        url: API_ENDPOINTS.GET_QUIZ(id), 
        method: 'GET', 
        token: localStorage.getItem('accessToken'), 
    })

    form.className = 'flex flex-col items-center'
    console.log(quiz);
    
    root.prepend(SidebarAdmin())
    form.append(
        InfoQuizForm([quiz.disciplina_id]),
        Button({
            variant: 'primary',
            title: 'Salvar alterações',
            ariaLabel: 'Botão para salvar alterações',
            type: 'submit',
            id: 'submit',
        })
    )
    main.append(
        Heading({
            title: 'Edição do Quiz', 
            goBack: true, 
            onGoBack: () => history.back()
        }),
        form
    )

    // Set quiz values on form
    const nomeInput = document.getElementById('nome')
    const disciplinaSelect = document.getElementById('disciplina')
    const tipoSelect = document.getElementById('tipo')
    const tempoSelect = document.getElementById('tempo')
    const tentativasSelect = document.getElementById('tentativas')
    const dataInicioContainer = document.getElementById('data-inicio')
    const dataInicio = dataInicioContainer.querySelector('input')
    const dataEntregaContainer = document.getElementById('data-final')
    const dataEntrega = dataEntregaContainer.querySelector('input')
    const orientacoes = document.getElementById('orientacoes')

    nomeInput.value = quiz.titulo
    disciplinaSelect.value = quiz.disciplina_id._id
    disciplinaSelect.disabled = true
    tipoSelect.value = quiz.tipo
    tempoSelect.value = quiz.tempo
    tentativasSelect.value = quiz.tentativas
    dataInicio.value = quiz.data_inicio
    dataEntrega.value = quiz.data_fim
    orientacoes.value = quiz.orientacao
    
}
catch (error) {
        
}
} EditQuizPage()