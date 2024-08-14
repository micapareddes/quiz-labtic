import { API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'

export async function getStudents() {
    try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await makeRequest( { url: API_ENDPOINTS.GET_ALL_STUDENTS_WITH_DISCIPLINAS, method:'GET', token: accessToken})
    
        return response
    } catch (error) {
        if (error.status === 403) {
            alert('Acesso Proibido')
            redirectTo404()
        } else {
            alert('Algo deu errado...')
        }
    }
}