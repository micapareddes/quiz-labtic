import { redirectToUserDashboard } from '/frontend/src/functions/redirectToUserDashboard.js'
import { reqUserType } from '/frontend/src/auth/reqUserType.js'

export async function checkAndRedirectUser() {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        const { userType } = await reqUserType()
        redirectToUserDashboard(userType)
    }
}