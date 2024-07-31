export async function checkAndRedirectUser() {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        const { userType } = await reqUserType()
        redirectToUserDashboard(userType)
    }
}