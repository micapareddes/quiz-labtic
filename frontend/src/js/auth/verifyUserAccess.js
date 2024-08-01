export async function verifyUserAccess(tipo) {
    const { userType } = await reqUserType()

    if (userType !== tipo) {
        redirectTo404()
    }
}