import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { API_ENDPOINTS } from '/frontend/src/utils/routes.js'

export async function cadastrar({ url, data }) {
    const accessToken = localStorage.getItem('accessToken')
    const response = await makeRequest({ 
        url, 
        method: 'POST', 
        token: accessToken, 
        data, 
    })
    
    return response
}