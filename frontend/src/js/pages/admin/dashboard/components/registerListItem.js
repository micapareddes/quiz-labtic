import { ListItemBoxWithTitle } from '/frontend/src/js/components/list.js'
import { Button } from '/frontend/src/js/components/button.js'

export function RegisterListItem({ name='Text', registerLink, linkPainel }) {
    const container = document.createElement('div')

    container.className = 'flex w-full flex-row justify-between items-center'
    container.appendChild(
        Button({
            title: 'Cadastrar novo',
            variant: 'ghost',
            size: 'md',
            link: registerLink,
        })
    )

    return ListItemBoxWithTitle({ 
        title: name, content: container,
        linkPainel,
    })
}