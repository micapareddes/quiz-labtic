import { makeRequest } from '/frontend/src/functions/makeRequest.js'

export async function cadastrarDisciplina(data) {
    const accessToken = localStorage.getItem('accessToken')
    const url = 'http://localhost:3333/api/disciplinas'
    const response = await makeRequest({ 
        url, 
        method: 'POST', 
        token: accessToken, 
        data 
    })
    return response
}