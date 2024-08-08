import { makeRequest } from '/frontend/src/js/functions/makeRequest.js'

export async function removerRelacao(id) {
    const accessToken = localStorage.getItem('accessToken')
    await makeRequest( { url: 'http://localhost:3333/api/alunos_disciplinas', method:'DELETE', data: { id }, token: accessToken})

    return
}