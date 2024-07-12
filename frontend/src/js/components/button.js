function Button( 
    { variant='primary', size='md', title='Button', destructive=false, icon=false, disabled=false, type='button', onClick }
) {
    const isLink = variant === 'link'
    const sizeStyle = {
        'sm': isLink ? 'text-sm' : 'px-5 py-2',
        'md': isLink ? 'text-base' : 'px-7 py-3',
        'lg': isLink ? 'text-lg' : 'w-64 py-3',
        'full': isLink ? 'text-xl' : 'w-full py-3'
    }
    const variantStyle = {
        'primary': 'bg-indigo-500 text-neutral-50 data-[destructive="true"]:bg-red-500',

        'outline': 'border border-stone-400 text-stone-500 data-[destructive="true"]:border-red-500 data-[destructive="true"]:text-red-500',

        'link': 'text-indigo-700 data-[destructive="true"]:text-red-500 hover:underline underline-offset-4'
    }

    const button = createHTMLElement('button')
    button.dataset.destructive = destructive
    button.type = type
    button.textContent = title
    button.className = sizeStyle[size] + ' ' +  variantStyle[variant] + ' ' + 'rounded-md'

    if (disabled) {
       button.disabled = true
       button.classList.add('opacity-50')
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

    button.addEventListener('click', () => {
        onClick()
    })

    return button
}

const main = document.getElementById('body')
main.appendChild(Button({variant: 'outline', size: 'full', destructive:true}))