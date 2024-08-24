import { API_ENDPOINTS } from '/frontend/src/utils/routes'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'

export async function removerProfessorDeDisciplinas(id) {
    const accessToken = localStorage.getItem('accessToken')
    await makeRequest( { 
        url: API_ENDPOINTS.DELETE_PROFESSOR_FROM_DISCIPLINA, 
        method:'DELETE', 
        data: { id }, 
        token: accessToken
    })
    return
}