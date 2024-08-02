import { makeRequest } from '/frontend/src/js/functions/makeRequest.js'

export async function getDisciplinas() {
    try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await makeRequest( { url: 'http://localhost:3333/api/disciplinas/cadastradas', method:'GET', token: accessToken})
    
        return response.disciplinasCadastradas 
    } catch (error) {
        if (error.status === 403) {
            alert('Acesso Proibido')
            redirectTo404()
        } else {
            alert('Algo deu errado...')
        }
    }
}