export function Title({ title='Titulo', size='xl', tone='s-900', bold='semibold', as='h1' }) {
    const font = {
        'md': 'text-base',
        'lg': 'text-lg',
        'xl': 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
    }
    const color = {
        's-500': 'text-stone-500',
        's-600': 'text-stone-600',
        's-700': 'text-stone-700',
        's-900': 'text-stone-900',
    }

    const weight = {
        'bold': 'font-bold',
        'semibold': 'font-semibold',
        'regular': 'font-normal',
    }

    const titulo = createHTMLElement(as)
    titulo.textContent = title
    titulo.className = `${font[size]} ${color[tone]} ${weight[bold]}`  

    return titulo
}

export function Text({ text='Texto', size='base', tone='500', bold=false, as='p' }) {
    const font = {
        'sm': 'text-sm',
        'md': 'text-base',
        'lg': 'text-lg',
        'xl': 'text-xl',
    }
    const color = {
        'i-50': 'text-indigo-50',
        'i-700': 'text-indigo-700',
        's-500': 'text-stone-500',
        's-600': 'text-stone-600',
        's-700': 'text-stone-700',
        's-900': 'text-stone-900',
    }

    const texto = createHTMLElement(as)
    texto.textContent = text
    texto.className = `text-sm ${font[size], color[tone], bold && 'font-semibold'}`
    return texto
}