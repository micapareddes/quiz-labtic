export function Title({ title='Titulo', size='xl', tone='s-900', bold='semibold', as='h1', className }) {
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

    const titulo = document.createElement(as)
    titulo.textContent = title
    titulo.className = `${font[size]} ${color[tone]} ${weight[bold]} ${className}`  

    return titulo
}

export function Text({ text='Texto', size='base', tone='s-500', bold='normal', as='p', className }) {
    const font = {
        'sm': 'text-sm',
        'md': 'text-base',
        'lg': 'text-lg',
        'xl': 'text-xl',
    }
    const color = {
        'i-50': 'text-indigo-50',
        'i-700': 'text-indigo-700',
        's-400': 'text-stone-400',
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

    const texto = document.createElement(as)
    texto.textContent = text
    texto.className = `${font[size]} ${color[tone]} ${weight[bold]} ${className}`
    return texto
}