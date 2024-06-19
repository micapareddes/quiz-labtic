document.addEventListener('DOMContentLoaded', () => {
    const accessToken = getFromLocalStorage('accessToken')

    verifyUserAccess('aluno')
    criarUiDashboard(accessToken, 'http://localhost:3333/api/alunos_disciplinas')
})