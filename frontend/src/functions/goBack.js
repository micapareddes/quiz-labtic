import { navigateTo } from '/frontend/src/functions/navigateTo.js'

export function goBack() {
    const previousWindowPath = localStorage.getItem('previousPath')
    navigateTo(previousWindowPath)
}