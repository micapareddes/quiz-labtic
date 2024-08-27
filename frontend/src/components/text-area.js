export function TextArea({ 
    placeholder='Placeholder...', id, size='fit', className,
}) {
    const handleFitRows = (e) => { //TODO: ajustar lógica
        const textareaLineHeight = 24;
        const previousRows = e.target.rows;
        e.target.rows = 1;
        const currentRows = Math.ceil(e.target.scrollHeight / textareaLineHeight);
        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }
        e.target.rows = currentRows;
    }
    const sizeStyle = {
        'fit': 'h-auto',
        'full': 'h-64',
    }
    const textarea = document.createElement('textarea')
    textarea.id = id
    textarea.className = `resize-none px-2 py-3 bg-transparent border border-stone-300 rounded-md ${sizeStyle[size]} ${className}`
    textarea.placeholder = placeholder
    if (size === 'fit') {
        textarea.rows = 1
        textarea.addEventListener('input', handleFitRows)
    }

    return textarea
}