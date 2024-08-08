export function parseUsers(usersBack) {
    return usersBack.map((user) => {
        const deleteUrl = `api/usuarios/${user._id}`
        const editUrl = `localhost/${user._id}`
        return {
            id: user._id, 
            name: user.nome, 
            matricula: user.matricula, 
            disciplinas: user.disciplinas, 
            toEdit: editUrl, 
            toRemove: deleteUrl,
        }
    })
}

