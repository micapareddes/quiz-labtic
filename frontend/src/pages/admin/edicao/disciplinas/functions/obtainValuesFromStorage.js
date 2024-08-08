export function obtainValuesFromStorage() {
    const nome = localStorage.getItem('1')
    const professor_id = localStorage.getItem('2')

    return {
        nome,
        professor_id
    }
}