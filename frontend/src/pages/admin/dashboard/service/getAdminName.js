import { makeRequest } from '/frontend/src/functions/makeRequest.js'

export async function getAdminName() {
    const accessToken = localStorage.getItem('accessToken')
    const response =  await makeRequest( { url: 'http://localhost:3333/api/usuarios/name', method:'GET', token: accessToken})
    return response.name
}