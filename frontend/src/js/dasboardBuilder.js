async function fetchDisciplinas(alunoId) {
    try {
        const disciplinas = await fetch("", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(alunoId)
        })
        console.log(disciplinas)

    } catch (error) {
        console.log('Erro no fetching disciplinas: ', error)
    }
}

