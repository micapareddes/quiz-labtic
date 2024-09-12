// Functions
import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { handleGuardarRascunho } from '../functions/handleGuardarRascunho.js'
import { infoQuizValidation } from '/frontend/src/validations/infoQuizValidation.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { goBack } from '/frontend/src/functions/goBack.js'
import { perguntasQuizValidation } from '/frontend/src/validations/perguntasQuizValidation.js'
import { postQuiz } from '../service/postQuiz.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { ErrorToaster, openToaster, closeToaster } from '/frontend/src/components/toaster.js'
import { Question } from '/frontend/src/components/question.js'
import { Button } from '/frontend/src/components/button.js'

async function handleSubmit(e) {
    e.preventDefault()
    const form = document.querySelector('form')
    const inputs = form.querySelectorAll('textarea')

    const {success} = perguntasQuizValidation(inputs)
    
    if (!success) {
        openToaster(
            ErrorToaster({message: 'Todos os campos devem ser preenchidos.'})
        )
        closeToaster()
        return
    }

    const { nome, tentativas, disciplina, tipo, tempoMax, dataInicio, dataFinal, orientacoes } = JSON.parse(localStorage.getItem('infos'))
    const perguntasContainer = Array.from(form.querySelectorAll('.pergunta-container'))
    const perguntas = 
        perguntasContainer.map((pergunta) => {
            const alternativasIncorretas = Array.from(pergunta.querySelectorAll('.incorreta'))
            const incorretasArray = alternativasIncorretas.map((i) => {
                return {
                    conteudo: i.value.trim(),
                    isCorreta: false
                }
            })
            
            return {
                pergunta: pergunta.querySelector('.pergunta').value.trim(),
                alternativas: [
                    {
                        conteudo: pergunta.querySelector('.correta').value.trim(),
                        isCorreta: true
                    },  
                    incorretasArray[0],
                    incorretasArray[1],
                    incorretasArray[2]          
                ]
            }
        })
    
    
    const data = {
        titulo: nome,
        disciplina_id: disciplina.id,
        tipo,
        tempo: tempoMax,
        tentativas,
        data_inicio: dataInicio,
        data_fim: dataFinal,
        orientacao: orientacoes,
        isRascunho: false,
        perguntas: perguntas,
    }
    const quizData = {
        disciplina_id: disciplina.id,
        nome_quiz: nome
    }

    try {
        const accessToken = localStorage.getItem('accessToken')
        await postQuiz(data) //TODO: Eliminar função e usar makeRequest
        await makeRequest({ 
            url: API_ENDPOINTS.PATCH_ADICIONAR_QUIZ_A_DISCIPLINA, 
            method: 'PATCH', 
            token: accessToken, 
            data: quizData, 
        })
        localStorage.removeItem('infos')
        localStorage.removeItem('perguntas')
        localStorage.setItem('quizCadastrado', true)
        navigateTo(ROUTES.PROFESSOR.DASHBOARD)
    } catch (error) {
        console.log(error);

        if (error.status === 5409) {            
            openToaster(
                ErrorToaster({ message: 'Já existe um quiz com esse nome!' })
            )
            closeToaster()
        } else {
            console.log(error);
            
            alert('Algo deu errado, tente novamente mais tarde...')
        }
    }
}
function saveData() {
    const form = document.querySelector('form')
    const perguntasContainer = Array.from(form.querySelectorAll('.pergunta-container'))
    const perguntas = 
        perguntasContainer.map((pergunta) => {
            const alternativasIncorretas = Array.from(pergunta.querySelectorAll('.incorreta'))
            const incorretasArray = alternativasIncorretas.map((i) => {
                return {
                    conteudo: i.value.trim(),
                    isCorreta: false
                }
            })
            
            return {
                pergunta: pergunta.querySelector('.pergunta').value.trim(),
                alternativas: [
                    {
                        conteudo: pergunta.querySelector('.correta').value.trim(),
                        isCorreta: true
                    },  
                    incorretasArray[0],
                    incorretasArray[1],
                    incorretasArray[2]          
                ]
            }
        })
    
    const jsonData = JSON.stringify(perguntas)
    localStorage.setItem('perguntas', jsonData)
}
export async function Step2Page() {
    const step = localStorage.getItem('step')
    if (!step) navigateTo(ROUTES.ERROR404)

    const main = document.getElementById('main')
    const form = document.createElement('form')
    const buttonsContainer = document.createElement('div')
    const { nome, disciplina } = JSON.parse(localStorage.getItem('infos'))

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
            type: 'submit', 
            onClick: () => {}, 
            id: 'submit',
        }),
    )
    form.appendChild(buttonsContainer)
    main.append(
        Heading({
            goBack: true, 
            title: nome, 
            subtitle: disciplina.nome,
            onGoBack: () => {
                saveData()
                navigateTo('/frontend/src/pages/professor/quiz/create/index.html?step=1')
            }
        }),
        form
    )
    form.onsubmit = handleSubmit

    const perguntas = JSON.parse(localStorage.getItem('perguntas'))
    if (perguntas) {
        const perguntasContainer = form.querySelectorAll('.pergunta-container')
        perguntasContainer.forEach((container) => {
            const pergunta = container.querySelector('.pergunta')
            const correta = container.querySelector('.correta')
            const incorretas = container.querySelectorAll('.incorreta')
            const incorreta1 = incorretas[0]
            const incorreta2 = incorretas[1]
            const incorreta3 = incorretas[2]
            const perguntaNum = pergunta.id

            pergunta.value = perguntas[perguntaNum - 1].pergunta
            pergunta.dispatchEvent(new Event('input', { bubbles: true }))
            
            correta.value = perguntas[perguntaNum - 1].alternativas[0].conteudo
            correta.dispatchEvent(new Event('input', { bubbles: true }))

            incorreta1.value = perguntas[perguntaNum - 1].alternativas[1].conteudo
            incorreta1.dispatchEvent(new Event('input', { bubbles: true }))

            incorreta2.value = perguntas[perguntaNum - 1].alternativas[2].conteudo
            incorreta2.dispatchEvent(new Event('input', { bubbles: true }))

            incorreta3.value = perguntas[perguntaNum - 1].alternativas[3].conteudo
            incorreta3.dispatchEvent(new Event('input', { bubbles: true }))

        })
    }
}