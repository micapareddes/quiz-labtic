import { Title } from './fonts.js'
import { TextArea } from './text-area.js'

function RespostaIncorreta(id, number) {
    const respostaIncorretaContainer = document.createElement('div')
    const xIcon = document.createElement('i')
    respostaIncorretaContainer.id = 
    respostaIncorretaContainer.className = 'w-full flex flex-row items-center gap-2'
    xIcon.className = 'ph-fill ph-x-circle text-red-500 text-3xl'
    respostaIncorretaContainer.append(
        xIcon,
        TextArea({
            placeholder: 'Digite aqui uma resposta incorreta...', 
            size: 'fit', 
            className: 'incorreta bg-red-50 w-full',
            id: `resposta-incorreta-${id}-${number}`,
        }),
    )
    return respostaIncorretaContainer
}

export function Question({ number='1' }) {
    const container = document.createElement('div')
    const respostasContainer = document.createElement('div')
    const checkIcon = document.createElement('i')
    const respostaCorretaContainer = document.createElement('div')

    container.id = `pergunta-container-${number}`
    container.className = 'pergunta-container flex flex-col'
    respostasContainer.className = 'flex flex-col space-y-5'
    respostaCorretaContainer.className = 'w-full flex flex-row items-center gap-2'
    checkIcon.className = 'ph-fill ph-check-circle text-emerald-400 text-3xl'    

    respostaCorretaContainer.append(
        checkIcon,
        TextArea({
            placeholder: 'Digite aqui a resposta correta...', 
            id: `resposta-correta-${number}`,
            size: 'fit', 
            className: 'correta bg-emerald-50 w-full',
        }),
    )
    respostasContainer.append(
        respostaCorretaContainer,
        RespostaIncorreta('1', number),
        RespostaIncorreta('2', number),
        RespostaIncorreta('3', number),
    )    
    container.append(
        Title({
            title: `Pergunta ${number}`, 
            size: 'xl',
            tone: 's-700', 
            as: 'h3',
            className: 'mb-3',
        }),
        TextArea({
            placeholder: 'Digite aqui a pergunta...', 
            id: `${number}`,
            size: 'fit', 
            className: 'pergunta mb-5',
        }),
        respostasContainer,
    )
    return container
}