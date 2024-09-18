import { getUrlParam } from '/frontend/src/functions/getUrlParam.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { API_ENDPOINTS } from '/frontend/src/utils/routes.js'

export async function editUser(data) {
    const accessToken = localStorage.getItem('accessToken')
    const id = getUrlParam('id')
    const response = await makeRequest({ 
        url: API_ENDPOINTS.PATCH_USER(id), 
        method:'PATCH', 
        token: accessToken,
        data,
    })
    return response
}