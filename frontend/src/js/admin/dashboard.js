document.addEventListener('DOMContentLoaded', async () => {
    const accessToken = getFromLocalStorage('accessToken')
    const nameReq = await makeRequest( { url: 'http://localhost:3333/api/usuarios/name', method:'GET', token: accessToken})
    
    const name = nameReq.name
    
    verifyUserAccess('admin')
    mostrarNomeUsuario(name)
})