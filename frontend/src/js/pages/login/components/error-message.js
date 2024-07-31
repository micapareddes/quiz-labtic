export function ErrorMessage(message) {
    const errorMessageSpan = createHTMLElement('span')
    errorMessageSpan.id = 'error-message'
    errorMessageSpan.textContent = message
    errorMessageSpan.className = 'text-sm text-red-500'
    return errorMessageSpan
}