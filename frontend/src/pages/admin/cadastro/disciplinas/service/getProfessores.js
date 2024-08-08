import { makeRequest } from '/frontend/src/functions/makeRequest.js'

export async function getProfessores() {
    try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await makeRequest( { url: 'http://localhost:3333/api/usuarios/professores', method:'GET', token: accessToken})
        return response.professoresCadastrados;
    } catch (error) {
        console.log(error)
        alert('Algo deu errado, tente novamente mais tarde...')
    }
}