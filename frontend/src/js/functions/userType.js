export async function reqUserType() {
    const url = 'http://localhost:3333/api/usuarios/me'
    const token = getFromLocalStorage('accessToken')
    return await makeRequest({ url, method: 'GET', token: token })
}