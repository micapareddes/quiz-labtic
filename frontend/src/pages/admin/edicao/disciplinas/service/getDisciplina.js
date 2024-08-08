import { getUrlParam } from '/frontend/src/pages/admin/edicao/disciplinas/functions/getUrlParam.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'

export async function getDisciplina() {
    try {
        const accessToken = localStorage.getItem('accessToken')
        const id = getUrlParam('id')
        const url = `http://localhost:3333/api/disciplinas/${id}`
        const response = await makeRequest({ url, method:'GET', token: accessToken })

        return response.disciplina;
    } catch (error) {
        if (error.status === 403) {
            alert('Acesso Proibido')
            redirectTo404()
        }
    }
}