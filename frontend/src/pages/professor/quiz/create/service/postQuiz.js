import { API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
export async function postQuiz(data) {
    const accessToken = localStorage.getItem('accessToken')
    const url = API_ENDPOINTS.POST_QUIZ
    const response = await makeRequest({ 
        url, 
        method: 'POST', 
        token: accessToken, 
        data 
    })
    return response
}