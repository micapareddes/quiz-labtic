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

export function parseDisciplinas(disciplinasBack) {
    return disciplinasBack.map((disciplina) => {
        const deleteUrl = `api/disciplinas/${disciplina._id}`
        const editUrl = `localhost/${disciplina._id}`
        return {
            id: disciplina._id, 
            name: disciplina.nome, 
            professor: disciplina.professor_id && disciplina.professor_id.nome, 
            quizzes: disciplina.quizes, 
            toEdit: editUrl, 
            toRemove: deleteUrl,
        }
    })
}