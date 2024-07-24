import { Button } from "./button.js"

export function EditRemoveActionButtons({ onEdit, onRemove }) {
    const container = createHTMLElement('div')
    const editButton = Button({
        variant: 'ghost',
        title: 'Editar',
        link: onEdit,
    })
    const removeButton = Button({
        variant: 'ghost',
        title: 'Remover',
        onClick: onRemove,
    })

    container.className = 'flex flex-row gap-8'
    container.append(editButton, removeButton)

    return container
}