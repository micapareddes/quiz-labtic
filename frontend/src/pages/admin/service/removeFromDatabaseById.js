import { makeRequest } from '/frontend/src/functions/makeRequest.js'

export async function removeFromDatabaseById({id, url}) {
    try {
        const accessToken = localStorage.getItem('accessToken')
        const data = {"id": id}
        await makeRequest( { 
            url, 
            method:'DELETE', 
            token: accessToken, 
            data
        })
        return
    } catch (error) {
        console.log(error);
        if (error.status === 403) {
            alert('Ação Proibida')
        } else {
            alert('Desculpe, algo deu errado. Tente novamente mais tarde.')
        }
    }
}