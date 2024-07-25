async function removeFromDatabaseById({id, url}) {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        const data = {"id": id}
        await makeRequest( { url, method:'DELETE', token: accessToken, data})

        console.log('deletado!');
        return  

    } catch(error) {
        console.log(error);

        if (error.status === 403) {
            alert('Acesso Proibido')
        } else {
            alert('Algo deu errado...')
        }
    }
}