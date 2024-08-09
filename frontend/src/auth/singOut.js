import { ROUTES } from '/frontend/src/utils/routes.js'
const buttonEncerrarSessao = document.getElementById('encerrar-sessao-button')
const buttonCancelarDialogEncerrarSessao = document.getElementById('cancelar-button-encerrar-sessao-dialog')
const buttonConfirmarDialogEncerrarSessao = document.getElementById('confirmar-button-encerrar-sessao-dialog')

export function signOut() {
    localStorage.removeItem('accessToken')
    window.location.href = ROUTES.LOGIN
}

// buttonEncerrarSessao.addEventListener('click', () => {
//     openDialog('dialog-encerrar-sessao')
// })

// buttonCancelarDialogEncerrarSessao.addEventListener('click', () => {
//     closeDialog('dialog-encerrar-sessao')
// })

// buttonConfirmarDialogEncerrarSessao.addEventListener('click', () => {
//     signOut()
// })