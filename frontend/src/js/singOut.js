const buttonEncerrarSessao = document.getElementById('encerrar-sessao-button')
const buttonCancelarDialogEncerrarSessao = document.getElementById('cancelar-button-encerrar-sessao-dialog')
const buttonConfirmarDialogEncerrarSessao = document.getElementById('confirmar-button-encerrar-sessao-dialog')

function signOut() {
    localStorage.removeItem('accessToken')
    window.location.href = 'http://localhost:5500/frontend/src/pages/login.html'
}

buttonEncerrarSessao.addEventListener('click', () => {
    openDialog('dialog-encerrar-sessao')
})

buttonCancelarDialogEncerrarSessao.addEventListener('click', () => {
    closeDialog('dialog-encerrar-sessao')
})

buttonConfirmarDialogEncerrarSessao.addEventListener('click', () => {
    signOut()
})