async function getProfessores() {
    const accessToken = getFromLocalStorage('accessToken')
    const professoresCadastrados = await makeRequest( { url: 'http://localhost:3333/api/usuarios/professores', method:'GET', token: accessToken})
    return professoresCadastrados;
}

function listarProfessoresNoSelect(listaProfessores) {
    const select = document.getElementById('select')

    listaProfessores.forEach((professor) => {
        const option = document.createElement('option')
        option.id = professor._id
        option.value = professor._id
        option.textContent = professor.nome
        select.appendChild(option)
    })
}