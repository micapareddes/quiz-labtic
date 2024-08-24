import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { API_ENDPOINTS } from '/frontend/src/utils/routes.js'

export async function cadastrarUser(data) {
    const accessToken = localStorage.getItem('accessToken')
    const response = await makeRequest({ 
        url: API_ENDPOINTS.POST_USER, 
        method: 'POST', 
        token: accessToken, 
        data, 
    })
    
    return response
}