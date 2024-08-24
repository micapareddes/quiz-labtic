import { getUrlParam } from '/frontend/src/pages/admin/edicao/functions/getUrlParam.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'

export async function getProfessorWithDisciplinas() {
    try {
        const accessToken = localStorage.getItem('accessToken')
        const id = getUrlParam('id')
        const response = await makeRequest({ 
            url: API_ENDPOINTS.GET_PROFESSOR_WITH_DISCIPLINA(id), 
            method:'GET', 
            token: accessToken 
        })
        return response
    } catch (error) {
        if (error.status === 403) {
            alert('Acesso Proibido')
            navigateTo(ROUTES.ERROR404)
        } else {
            console.log(error);
            
            alert('Algo deu errado, tente novamente mais tarde...')
        }
    }
}