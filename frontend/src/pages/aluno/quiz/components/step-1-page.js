// Functions
import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { getUrlParam } from '/frontend/src/pages/admin/edicao/functions/getUrlParam.js'
import { formatDate } from '/frontend/src/functions/formatDate.js'
import { getCurrentDate } from '/frontend/src/functions/getCurrentDate.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
// Components
import { Heading } from '/frontend/src/components/heading.js'
import { Title, Text } from '/frontend/src/components/fonts.js'
import { Button } from '/frontend/src/components/button.js'
import { AttemptsSidecard } from './attempts-sidecard.js'
import { openDialog, ActionDialog } from '/frontend/src/components/dialog.js'

function convertTime(minutes) {
    if (minutes < 60) {
      return `${minutes}min`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}hs ${remainingMinutes}min`;
    }
}

export async function Step1Page() {
    try {
        const id = getUrlParam('id')
        const accessToken = localStorage.getItem('accessToken')
        const data = await makeRequest({
            method: 'GET',
            url: API_ENDPOINTS.GET_QUIZ_INFO_FOR_STRUDENT_BY_ID(id),
            token: accessToken,
        })
        const main = document.getElementById('main')
        const container = document.createElement('div')
        const infoContainer = document.createElement('div')
        const sidecardContainer = document.createElement('div')
        const orientacoesContainer = document.createElement('div')
        const orientacoesTitulo = Title({
            title: 'Orientações do Professor',
            size: 'lg', 
            tone: 's-700', 
            bold: 'semibold', 
            as: 'h4', 
        })
        const orientacoes = Text({
            text: data.orientacao, 
            size:'md', 
            tone:'s-700', 
            bold:'normal', 
            as:'p', 
        })
        const quizInfosList = document.createElement('ul')
        const quizInfos = [
            {
                title: 'Tentativas',
                value: data.tentativas === '0' ? 'Ilimitadas' : data.tentativas,
            },            
            {
                title: 'Tempo Máximo',
                value: convertTime(data.tempo),
            },            
            {
                title: 'Data de Inicio',
                value: formatDate(data.data_inicio),
            },            
            {
                title: 'Data de Entrega',
                value:  formatDate(data.data_fim),
            },
        ]
        const tentativasAluno = data.tentativas_aluno
        const attempts = tentativasAluno.map((tentativa, index) => {
            return {
                attemptNumber: index + 1,
                grade: tentativa.nota,
                answerLink: ROUTES.ALUNO.GABARITO({
                    quiz: id,
                    tentativa: tentativa._id
                })
            }

        })
        const quizExpirou = getCurrentDate() > data.data_fim
        const alunoEsgotouTentativas = data.tentativas !== '0' && data.tentativas <= tentativasAluno.length
       
        main.classList.add('flex', 'md:flex-row', 'gap-24')
        infoContainer.className = 'pl-11 pb-11'
        orientacoesContainer.className = 'my-8'
        quizInfosList.className = 'space-y-4 mb-12'

        sidecardContainer.appendChild(
            AttemptsSidecard({
                attempts,
            })
        )
        quizInfos.forEach((info) => {
            const listItem = document.createElement('li')
            const bulletPoint = Text({
                text: '• ',
                size: 'md',
                tone: 's-700',
                bold: 'semibold',
                className: 'px-2'
            })            
            const title = Text({
                text: `${info.title}:`,
                size: 'md',
                tone: 's-700',
                bold: 'semibold',
                className: 'pr-2'
            })
            const value = Text({
                text: info.value,
                size: 'md',
                tone: 'i-700',
                bold: 'semibold',
            })

            listItem.className = 'flex flex-row items-center'
            listItem.append(bulletPoint, title, value)
            quizInfosList.appendChild(listItem)
        })
        orientacoesContainer.append(
            orientacoesTitulo,
            orientacoes,
        )
        infoContainer.prepend(
            orientacoesContainer,
            quizInfosList,
            Button({
                id: 'open-quiz',
                title: quizExpirou ? 'Encerrado' : alunoEsgotouTentativas ? 'Entregue' : 'Começar quiz',
                onClick: () => {
                    localStorage.setItem('step', true)
                    openDialog(
                        ActionDialog({
                            title: 'Deseja começar agora?', 
                            message: 'Ao clicar no botão o quiz começará imediatamente e deve ser entregue para poder sair.', 
                            confirmarButtonName: 'Começar', 
                            onConfirm: async () => {
                                const respostaId = await makeRequest({
                                    method: 'POST',
                                    url: API_ENDPOINTS.EMBARALHA(id),
                                    token: accessToken,
                                })
                                navigateTo(`/frontend/src/pages/aluno/quiz/index.html?step=2&id=${respostaId}`)
                            },
                        })
                    )
                },
                disabled: quizExpirou || alunoEsgotouTentativas,
            })
        )
        container.append(            
            Heading({ 
                goBack: true, 
                onGoBack: () => history.back(),
                title: data.titulo, 
                subtitle: data.disciplina_nome,
                subtitleSize: 'lg'
            }),
            infoContainer
        )
        main.append(
            container,
            sidecardContainer
        )
    
        localStorage.removeItem('remainingTime')
    } catch (error) {
        console.log(error);
        alert('Algo deu errado... Encerre a sessão e tente novamente.')
        
    }
}