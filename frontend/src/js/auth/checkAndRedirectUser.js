import { reqUserType } from '/frontend/src/js/functions/userType.js'
import { redirectToUserDashboard } from '/frontend/src/js/functions/redirectToUserDashboard.js'

export async function checkAndRedirectUser() {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        const { userType } = await reqUserType()
        redirectToUserDashboard(userType)
    }
}