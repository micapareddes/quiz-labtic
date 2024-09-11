export async function removerRelacaoDaDisciplina(id) {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        await makeRequest( { url: 'http://localhost:3333/api/alunos_disciplinas', method:'DELETE', data: { id }, token: accessToken})

        return

    } catch (error) {
        console.log(error.status);
    }
}