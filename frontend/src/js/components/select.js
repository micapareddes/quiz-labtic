import { TooltipInfo } from "./tooltip-info.js"

export function Select({ 
    options=[], labelName, id, tooltip=false, tooltipMessage  
}) {
    const container = createHTMLElement('div')
    const labelContainer = createHTMLElement('div')
    const label = createHTMLElement('label')

    label.textContent = labelName
    label.htmlFor = id
    label.className = 'text-base text-stone-900 capitalize'

    labelContainer.className = 'flex items-center gap-1' 

    labelContainer.appendChild(label)

    if (tooltip) labelContainer.appendChild( TooltipInfo({ message: tooltipMessage }) )

    if (labelName)  container.appendChild(labelContainer)
    
    return container
}