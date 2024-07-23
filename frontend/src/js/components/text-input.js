import { TooltipInfo } from "./tooltip-info.js"

export function TextInput({ 
    labelName, placeholder='Placeholder', id, size='regular', tooltip=false, tooltipMessage 
}) {
    const text = {
        'regular': 'text-base',
        'large': 'text-lg',
    }

    const container = createHTMLElement('div')
    const labelContainer = createHTMLElement('div')
    const label = createHTMLElement('label')
    const input = createHTMLElement('input')

    container.className = 'space-y-3'

    input.type = 'text'
    input.name = id
    input.id = id
    input.placeholder = placeholder
    input.className = `px-2 py-3 rounded-md border border-neutral-300 bg-transparent ${text[size]} text-stone-900 w-full`

    label.textContent = labelName
    label.htmlFor = id
    label.className = 'text-base text-stone-900 capitalize'

    labelContainer.className = 'flex items-center gap-1' 

    labelContainer.appendChild(label)

    if (tooltip) labelContainer.appendChild( TooltipInfo({ message: tooltipMessage }) )

    if (labelName)  container.appendChild(labelContainer)

    container.append(input)

    return container
}