import { Title, Text } from '/frontend/src/components/fonts.js'
import { formatDate } from '/frontend/src/functions/formatDate.js'

function convertTime(minutes) {
    if (minutes < 60) {
      return `${minutes}min`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}hs ${remainingMinutes}min`;
    }
}

export function QuizInfo({
    orientacao, tentativas, tempo, dataInicio, dataFim
}) {
    const container = document.createElement('div')
    const orientacoesContainer = document.createElement('div')
    const orientacoesTitulo = Title({
            title: 'Orientações do Professor',
            size: 'lg', 
            tone: 's-700', 
            bold: 'semibold', 
            as: 'h4', 
    })
    const orientacoes = Text({
            text: orientacao, //TODO: Quando nao tem orientação exibir mensagem "nao ha" porem deve ser verificado como salva orientacao vazia no banco 
            size:'md', 
            tone:'s-700', 
            bold:'normal', 
            as:'p', 
    })
    const quizInfosList = document.createElement('ul')
    const quizInfos = [
        {
            title: 'Tentativas',
            value: tentativas === '0' ? 'Ilimitadas' : tentativas,
        },            
        {
            title: 'Tempo Máximo',
            value: convertTime(tempo),
        },            
        {
            title: 'Data de Inicio',
            value: formatDate(dataInicio),
        },            
        {
            title: 'Data de Entrega',
            value:  formatDate(dataFim),
        },
    ]
    quizInfosList.className = 'space-y-4'
    container.className = 'space-y-6'

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
    container.append( orientacoesContainer, quizInfosList )
    return container
}