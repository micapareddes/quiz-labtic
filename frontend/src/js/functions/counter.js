export function getCounterTotal() {
    const quantidade = document.getElementById('quantidade-cadastros')
    return Number(quantidade.textContent)
}

export function countDown(){
    const quantidade = document.getElementById('quantidade-cadastros')
    quantidade.textContent = Number(quantidade.textContent) - 1
}