export function Button( 
    { variant='primary', size='md', title='Button', destructive=false, icon=false, disabled=false, type='button', onClick, link=null, id='button-id', ariaLabel=title }
) {
    const isGhost = variant === 'ghost'
    const sizeStyle = {
        'sm': isGhost ? 'text-sm' : 'px-5 py-2',
        'md': isGhost ? 'text-base' : 'px-7 py-3',
        'lg': isGhost ? 'text-lg' : 'w-64 py-3',
        'full': isGhost ? 'text-xl' : 'w-full py-3'
    }
    const variantStyle = {
        'primary': 'bg-indigo-500 enabled:hover:bg-indigo-400 transition-all duration-100 text-neutral-50 data-[destructive="true"]:bg-red-500 enabled:data-[destructive="true"]:hover:bg-red-400',

        'outline': 'border border-stone-400 enabled:hover:bg-stone-400 enabled:hover:bg-opacity-10 text-stone-500 transition-all duration-100 data-[destructive="true"]:border-red-500 data-[destructive="true"]:text-red-500 enabled:data-[destructive="true"]:hover:bg-red-500 enabled:data-[destructive="true"]:hover:bg-opacity-10',

        'ghost': 'text-indigo-700 data-[destructive="true"]:text-red-500 enabled:hover:underline underline-offset-4'
    }

    const button = link ? document.createElement('a') : document.createElement('button')
    button.setAttribute('aria-label', ariaLabel)
    button.id = id
    button.dataset.destructive = destructive
    if (!link) button.type = type
    button.textContent = title
    button.className = sizeStyle[size] + ' ' +  variantStyle[variant] + ' ' + 'rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

    if (disabled) {
       button.disabled = true
    }

    if (icon) {
        const iconImg = document.createElement('i')
        iconImg.className = `ph ph-${icon}`
  
        button.prepend(iconImg)
        button.classList.add('flex', 'items-center', 'justify-center', 'gap-2')
    }

    if (link) button.href = link

    if (!link) button.onclick = onClick

    return button
}