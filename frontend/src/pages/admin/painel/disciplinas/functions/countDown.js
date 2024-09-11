export function countDown(){
    const quantidade = document.getElementById('quantidade-cadastros')
    quantidade.textContent = Number(quantidade.textContent) - 1
}