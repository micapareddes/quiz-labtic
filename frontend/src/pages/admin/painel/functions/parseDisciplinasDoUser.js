export function parseDisciplinasDoUser(disciplinasBack) {
    return disciplinasBack.map((disciplina) => {
        return {
            nome: disciplina.disciplina_nome,
        }
    })
}