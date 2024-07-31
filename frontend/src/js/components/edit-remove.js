import { Button } from "./button.js"

export function EditRemoveActionButtons({ onEdit, onRemove }) {
    const container = document.createElement('div')
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

    container.className = 'space-x-8 flex nowrap'
    container.append(editButton, removeButton)

    return container
}