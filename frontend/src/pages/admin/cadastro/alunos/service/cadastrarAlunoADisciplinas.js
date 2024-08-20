import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { API_ENDPOINTS } from '/frontend/src/utils/routes.js'

export async function cadastrarAlunoADisciplinas(data) {
    const accessToken = localStorage.getItem('accessToken')
    return await makeRequest({ 
        url: API_ENDPOINTS.POST_STUDENT_RELATIONS, 
        method: 'POST', 
        token: accessToken, 
        data, 
    })
}