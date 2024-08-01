import { reqUserType } from '/frontend/src/js/auth/reqUserType.js'

export async function verifyUserAccess(tipo) {
    const { userType } = await reqUserType()

    if (userType !== tipo) {
        redirectTo404()
    }
}