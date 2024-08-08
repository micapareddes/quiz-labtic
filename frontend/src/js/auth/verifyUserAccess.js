import { reqUserType } from '/frontend/src/js/auth/reqUserType.js'
import { navigateTo } from '/frontend/src/js/functions/navigateTo.js'

export async function verifyUserAccess(tipo) {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
        const { userType } = await reqUserType()

        if (userType !== tipo) {
            const page404 = '/frontend/src/pages/404.html'
            navigateTo(page404)
        }

        return
    }
    const login = '/frontend/src/pages/login.html'
    navigateTo(login)
}