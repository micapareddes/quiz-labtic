export function Button( 
    { variant='primary', size='md', title='Button', destructive=false, icon=false, disabled=false, type='button', onClick, link=null }
) {
    const isGhost = variant === 'ghost'
    const sizeStyle = {
        'sm': isGhost ? 'text-sm' : 'px-5 py-2',
        'md': isGhost ? 'text-base' : 'px-7 py-3',
        'lg': isGhost ? 'text-lg' : 'w-64 py-3',
        'full': isGhost ? 'text-xl' : 'w-full py-3'
    }
    const variantStyle = {
        'primary': 'bg-indigo-500 hover:bg-indigo-400 transition-all duration-100 text-neutral-50 data-[destructive="true"]:bg-red-500 data-[destructive="true"]:hover:bg-red-400',

        'outline': 'border border-stone-400 hover:bg-stone-400 hover:bg-opacity-10 text-stone-500 transition-all duration-100 data-[destructive="true"]:border-red-500 data-[destructive="true"]:text-red-500 data-[destructive="true"]:hover:bg-red-500 data-[destructive="true"]:hover:bg-opacity-10',

        'ghost': 'text-indigo-700 data-[destructive="true"]:text-red-500 hover:underline underline-offset-4'
    }

    const button = link ? createHTMLElement('a') : createHTMLElement('button')
    button.dataset.destructive = destructive
    if (!link) button.type = type
    button.textContent = title
    button.className = sizeStyle[size] + ' ' +  variantStyle[variant] + ' ' + 'rounded-md cursor-pointer'

    if (disabled) {
       button.disabled = true
       button.classList.remove('hover:bg-stone-400', 'hover:bg-opacity-10', 'hover:underline', 'data-[destructive="true"]:hover:bg-red-400', 'data-[destructive="true"]:hover:bg-red-500', 'hover:bg-none')
       button.classList.add('opacity-50', 'cursor-not-allowed')
    }

    if (icon) {
        const iconImg = createHTMLElement('img')
        iconImg.src = '/frontend/src/img/icones/file-plus.svg'
        iconImg.width = 32
        iconImg.height = 32
  
        console.log(iconImg);
        button.prepend(iconImg)
        console.log(button);
        button.classList.add('flex', 'items-center', 'justify-center', 'gap-2')
    }

    if (link) button.href = link

    if (!link) button.addEventListener('click', () => {
        onClick()
    })

    return button
}