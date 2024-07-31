import { makeRequest } from '/frontend/src/js/functions/makeRequest.js'
export async function reqUserType() {
    const url = 'http://localhost:3333/api/usuarios/me'
    const token = localStorage.getItem('accessToken')
    return await makeRequest({ url, method: 'GET', token: token })
}