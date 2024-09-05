// Functions
import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { verifyUserAccess } from '/frontend/src/auth/verifyUserAccess.js'
import { saveWindowPath } from '/frontend/src/functions/saveWindowPath.js'
import { getUrlParam } from '/frontend/src/pages/admin/edicao/functions/getUrlParam.js'
import { goBack } from '/frontend/src/functions/goBack.js'

// Components
import { Heading } from '/frontend/src/components/heading.js'
import { Title, Text } from '/frontend/src/components/fonts.js'
import { Button } from '/frontend/src/components/button.js'
import { AttemptsSidecard } from './attempts-sidecard.js'

export async function Step1Page() {
    try {
        verifyUserAccess('aluno')
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
            text: 'Lorem ipsum dolor sit amet consectetur. Eros nibh urna eu varius amet id. Ipsum mi ultrices pulvinar ultricies et facilisis arcu. Id velit senectus maecenas donec. Nulla nec fermentum non egestas elit quam vestibulum adipiscing.', 
            size:'md', 
            tone:'s-700', 
            bold:'normal', 
            as:'p', 
        })
        const quizInfosList = document.createElement('ul')
        const quizInfos = [
            {
                title: 'Tentativas',
                value: 3,
            },            
            {
                title: 'Tempo Máximo',
                value: 30,
            },            
            {
                title: 'Data de Inicio',
                value: '30 de Mar',
            },            
            {
                title: 'Data de Entrega',
                value: '30 de Mar',
            },
        ]
        const id = getUrlParam('id')

        main.classList.add('flex', 'md:flex-row', 'gap-24')
        infoContainer.className = 'pl-11'
        orientacoesContainer.className = 'my-8'
        quizInfosList.className = 'space-y-4 mb-12'

        sidecardContainer.appendChild(
            AttemptsSidecard({
                attempts: [],
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
                title: 'Começar quiz',
                onClick: () => {}
            })
        )
        container.append(            
            Heading({ 
                goBack: true, 
                onGoBack: () => goBack(),
                title: 'Quiz name', 
                subtitle: 'Disciplina',
                subtitleSize: 'lg'
            }),
            infoContainer
        )
        main.append(
            container,
            sidecardContainer
        )
    
        saveWindowPath()
    } catch (error) {
        console.log(error);
        alert('Algo deu errado... Encerre a sessão e tente novamente.')
        
    }
}