import { ROUTES } from '/frontend/src/utils/routes.js'
import { reqUserType } from '/frontend/src/js/auth/reqUserType.js'
import { navigateTo } from '/frontend/src/js/functions/navigateTo.js'

export async function verifyUserAccess(tipo) {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
        const { userType } = await reqUserType()

        if (userType !== tipo) {
            navigateTo(ROUTES.ERROR404)
        }

        return
    }
    navigateTo(ROUTES.LOGIN)
}