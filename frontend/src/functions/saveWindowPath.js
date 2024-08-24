export function saveWindowPath() {
    const currentPath = window.location.pathname
    localStorage.setItem('windowPath', currentPath)
}