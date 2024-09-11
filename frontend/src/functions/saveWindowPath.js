export function saveWindowPath() {
    const currentPath = window.location.href
    const previousPath = localStorage.getItem('windowPath')
    if (previousPath) {
        localStorage.setItem('previousPath', previousPath) 
        localStorage.setItem('windowPath', currentPath)
    } else {
        localStorage.setItem('windowPath', currentPath)
    }
}