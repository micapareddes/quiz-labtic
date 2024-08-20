import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { API_ENDPOINTS } from '/frontend/src/utils/routes.js'

export async function cadastrarProfessorADisciplinas(data) {
    const accessToken = localStorage.getItem('accessToken')
    return await makeRequest({ 
        url: API_ENDPOINTS.PATCH_PROFESSORES_TO_DISCIPLINAS, 
        method: 'PATCH', 
        token: accessToken, 
        data, 
    })
}