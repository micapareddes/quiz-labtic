import { makeRequest } from '/frontend/src/js/functions/makeRequest.js'
import { reqUserType } from '/frontend/src/js/functions/userType.js'
import { redirectToUserDashboard } from '/frontend/src/js/functions/redirectToUserDashboard.js'

export async function reqLogin(userData) {
    const url = 'http://localhost:3333/api/usuarios/login'
    const { accessToken } = await makeRequest({ url, method: 'POST', data: userData })

    localStorage.setItem('accessToken', accessToken)
    const { userType } = await reqUserType()
    redirectToUserDashboard(userType)
}