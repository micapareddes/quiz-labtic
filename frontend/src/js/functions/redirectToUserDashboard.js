export function redirectToUserDashboard(userType) {
    if (userType === 'aluno') {
        window.location.href = 'http://localhost:5500/frontend/src/pages/aluno/dashboard.html'
    } else if (userType === 'professor') {
        window.location.href = 'http://localhost:5500/frontend/src/pages/professor/dashboard.html'
    } else if (userType === 'admin') {
        window.location.href = 'http://localhost:5500/frontend/src/pages/adm/dashboard.html'
    }
}