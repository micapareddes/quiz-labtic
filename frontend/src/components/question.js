import { Title } from './fonts.js'
import { TextArea } from './text-area.js'

function RespostaIncorreta() {
    const respostaIncorretaContainer = document.createElement('div')
    const xIcon = document.createElement('i')
    respostaIncorretaContainer.className = 'w-full flex flex-row items-center gap-2'
    xIcon.className = 'ph-fill ph-x-circle text-red-500 text-3xl'
    respostaIncorretaContainer.append(
        xIcon,
        TextArea({
            placeholder: 'Digite aqui uma resposta incorreta...', 
            size: 'fit', 
            className: 'bg-red-50 w-full',
        }),
    )
    return respostaIncorretaContainer
}

export function Question({ number='1' }) {
    const container = document.createElement('div')
    const respostasContainer = document.createElement('div')
    const checkIcon = document.createElement('i')
    const respostaCorretaContainer = document.createElement('div')

    container.className = 'flex flex-col'
    respostasContainer.className = 'flex flex-col space-y-5'
    respostaCorretaContainer.className = 'w-full flex flex-row items-center gap-2'
    checkIcon.className = 'ph-fill ph-check-circle text-emerald-400 text-3xl'    

    respostaCorretaContainer.append(
        checkIcon,
        TextArea({
            placeholder: 'Digite aqui a resposta correta...', 
            id: `resposta-correta-${number}`,
            size: 'fit', 
            className: 'bg-emerald-50 w-full',
        }),
    )
    respostasContainer.append(
        respostaCorretaContainer,
        RespostaIncorreta(),
        RespostaIncorreta(),
        RespostaIncorreta(),
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
            id: `pergunta-${number}`,
            size: 'fit', 
            className: 'mb-5',
        }),
        respostasContainer,
    )
    return container
}