import { makeRequest } from '/frontend/src/functions/makeRequest.js'

export async function removeFromDatabaseById({id, url}) {
    const accessToken = localStorage.getItem('accessToken')
    const data = {"id": id}
    await makeRequest( { url, method:'DELETE', token: accessToken, data})
    return
}