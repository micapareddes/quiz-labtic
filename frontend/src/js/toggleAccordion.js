const accordion = document.getElementById('accordion-disciplinas')

function toggleAccordionDisciplinas() {
    const dataActive = accordion.getAttribute('data-active')
    const isActive = dataActive === 'true'
    const listaDisciplinas = document.getElementById('ul-disciplinas')

    if (!isActive && listaDisciplinas) {
        accordion.setAttribute('data-active', true)
        listaDisciplinas.classList.remove('hidden')
        listaDisciplinas.classList.add('flex')

    } else if (isActive && listaDisciplinas) {
        accordion.setAttribute('data-active', false)
        listaDisciplinas.classList.remove('flex')
        listaDisciplinas.classList.add('hidden')
    }
}

accordion.addEventListener('click', () => {
    toggleAccordionDisciplinas()
})