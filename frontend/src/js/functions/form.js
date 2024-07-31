export function checkFilledInputs(inputs=[]) {
    return inputs.every(input => input.value.trim() !== '');
}

export function createErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    
    if (errorMessage) {
        errorMessage.textContent = message
    } 
        const messageContainer = document.createElement('span')
        messageContainer.id = 'error-message'
        messageContainer.textContent = message
        messageContainer.className = 'text-sm text-red-500'
        
        return messageContainer
}

export function formError({inputs=[], message}) {
    inputs.forEach((input) => input.classList.add('border-red-500'))
    inputs[inputs.length - 1].appendChild(createErrorMessage(message))
}

export function removeErrorMessage(inputs=[]) {
    const errorMessage = document.getElementById('error-message');

    if (errorMessage) errorMessage.remove()

    inputs.forEach((input) => {
        input.classList.remove('border-red-500')
    })
}