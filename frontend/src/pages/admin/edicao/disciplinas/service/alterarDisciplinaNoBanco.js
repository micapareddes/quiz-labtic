import { getUrlParam } from '/frontend/src/pages/admin/edicao/disciplinas/functions/getUrlParam.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'


export async function alterarDisciplinaNoBanco(data) {
    const accessToken = localStorage.getItem('accessToken')
    const id = getUrlParam('id')
    const url = `http://localhost:3333/api/disciplinas/${id}`
    return await makeRequest({ url, method:'PATCH', data, token: accessToken })
}