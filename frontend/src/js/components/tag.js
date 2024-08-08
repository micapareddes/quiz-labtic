export function Tag({ title='Tag' }) {
    const tag = document.createElement('span')
    tag.className = 'bg-indigo-500 text-indigo-50 text-sm rounded-full px-4'
    tag.textContent = title

    return tag
}