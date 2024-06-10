const formulario = document.querySelector("#login-form");

formulario.addEventListener("submit", (event) => {
    event.preventDefault()

    const userData = {
        user: event.target.user.value,
        senha: event.target.senha.value
    }

    fetch('http://localhost:3333/api/usuarios/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    })
    
})