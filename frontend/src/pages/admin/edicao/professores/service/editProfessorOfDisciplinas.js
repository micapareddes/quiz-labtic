import { getUrlParam } from '/frontend/src/pages/admin/edicao/functions/getUrlParam.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { navigateTo } from '/frontend/src/functions/navigateTo.js'
import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'

export async function editProfessorOfDisciplinas(data) {
    const accessToken = localStorage.getItem('accessToken')
    const id = getUrlParam('id')
    const response = await makeRequest({ 
        url: API_ENDPOINTS.PATCH_DISCIPLINA_POFESSOR_BY_ID(id), 
        method:'PATCH', 
        token: accessToken,
        data 
    })
    return response
}