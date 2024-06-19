document.addEventListener('DOMContentLoaded', () => {
    const accessToken = getFromLocalStorage('accessToken')

    verifyUserAccess('professor')
    criarUiDashboard(accessToken, 'http://localhost:3333/api/disciplinas')
})