import { redirectToUserDashboard } from '/frontend/src/js/functions/redirectToUserDashboard.js'
import { reqUserType } from '/frontend/src/js/auth/reqUserType.js'

export async function checkAndRedirectUser() {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        const { userType } = await reqUserType()
        redirectToUserDashboard(userType)
    }
}