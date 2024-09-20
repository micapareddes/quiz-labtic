export function embaralhar(array) {
    for (let indice = array.length; indice; indice--) {

        const indiceAleatorio = Math.floor(Math.random() * indice)

        const elemento = array[indice - 1];
        
        array[indice - 1] = array[indiceAleatorio];
        
        array[indiceAleatorio] = elemento;

    }
    return array
}