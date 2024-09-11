// Functions
import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { infoQuizValidation } from '/frontend/src/validations/infoQuizValidation.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { goBack } from '/frontend/src/functions/goBack.js'
import { perguntasQuizValidation } from '/frontend/src/validations/perguntasQuizValidation.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { getUrlParam } from '../../../admin/edicao/functions/getUrlParam.js'


// Components
import { Heading } from '/frontend/src/components/heading.js'
import { ErrorToaster, openToaster, closeToaster } from '/frontend/src/components/toaster.js'
import { openDialog, ActionDialog, SuccessDialog } from '/frontend/src/components/dialog.js'
import { Question } from '/frontend/src/components/question.js'
import { Button } from '/frontend/src/components/button.js'
import { PerguntaResposta } from '/frontend/src/components/pergunta-resposta.js'
import { Timer } from './timer.js'
import { QuestionSidecard } from '/frontend/src/components/sidecard.js'

function handleInput(e) {
    e.preventDefault()
    const form = document.querySelector('form')
    const perguntas = form.querySelectorAll(':scope > div:first-child > div')
    let respostasAluno = []

    perguntas.forEach((perg, index) => {
        const resposta = perg.querySelector('input:checked')
        const perguntaId = perg.id
        const respostaId = resposta ? resposta.value : null
        
        respostasAluno.push({
            pergunta_id: perguntaId,
            alternativa_id: respostaId,
        })

        if (resposta) {
            const sidecard = document.getElementById('sidecard')
            const perguntas = sidecard.querySelector(':scope > div')
            const pergunta = perguntas.querySelector(`[pergunta="${perguntaId}"]`) 
            const answer = pergunta.querySelector('#answer') 
            const letra = resposta.getAttribute('alternativa')
            
            answer.textContent = letra.toUpperCase()
        }
    })
    console.log(perguntas);
    
    localStorage.setItem('respostas', JSON.stringify(respostasAluno))
}

async function handleSubmit(e) {
    e.preventDefault()
    const form = document.querySelector('form')
    const respostasAluno = JSON.parse(localStorage.getItem('respostas'))
    const data = {
        quiz_id: form.id,
        respostas_perguntas: respostasAluno
    }
    
    try {
        const accessToken = localStorage.getItem('accessToken')
        await makeRequest({
            method: 'POST',
            url: API_ENDPOINTS.POST_RESPOSTA,
            data,
            token: accessToken,

        })
        localStorage.removeItem('respostas')
        openDialog(
            SuccessDialog({
                title: 'Entregue',
            })
        )
    } catch (error) {
        console.log(error);
        
    }
}

export async function Step2Page() {
    try {
        const step = localStorage.getItem('step')
        if (!step) navigateTo(ROUTES.ERROR404)
    
        const quizId = getUrlParam('id')
        if (!quizId) navigateTo(ROUTES.ERROR404)

        const accessToken = localStorage.getItem('accessToken')
        const quiz = await makeRequest({
            method: 'GET',
            url: API_ENDPOINTS.GET_QUIZ_BY_ID(quizId),
            token: accessToken,
        })
        const main = document.getElementById('main')
        const form = document.createElement('form')
        const perguntasContainer = document.createElement('div')
        const header = document.createElement('div')
        let perguntas = [];

        form.id = quiz._id
        form.className = 'flex flex-row gap-20'
        perguntasContainer.className = 'pt-10 space-y-16'
        header.className = 'flex items-center justify-between'

        quiz.perguntas.forEach((perg, index) => {
            perguntasContainer.appendChild(
                PerguntaResposta({
                    number: index + 1,
                    pergunta: perg.pergunta,
                    alternativas: perg.alternativas,
                    perguntaId: perg._id,
                })
            )   
            perguntas.push({
                question: `Pergunta ${index + 1}`,
                questionId: perg._id,
                answer: '-'
            })
        })
        form.append(
            perguntasContainer,
            QuestionSidecard({
                buttonName: 'Entregar',
                onClick: () => {
                    openDialog(
                        ActionDialog({ 
                            title: 'Entregar quiz?',
                            message: 'Você irá entregar o quiz. Esta ação não pode ser desfeita.',
                            confirmarButtonName: 'Entregar',
                            onConfirm: () => {
                                form.dispatchEvent(
                                    new Event('submit'), {
                                        bubbles: true,
                                        cancelable: true
                                    }
                                )
                            },
                        })
                    )
                },
                questions: perguntas, 
            }),
        )
        header.append(
            Heading({
                goBack: false, 
                title: quiz.titulo, 
                subtitle: quiz.disciplina_id.nome,
                onGoBack: () => {
                }
            }),
            Timer({ time: quiz.tempo })
        )
        main.append(
            header,
            form,
        )

        form.oninput = handleInput
        form.onsubmit = handleSubmit

        document.addEventListener('timesUp', () => {
            form.dispatchEvent(
                new Event('submit'), {
                    bubbles: true,
                    cancelable: true
                }
            )
        })

    } catch (error) {
        console.log(error)
    }
}