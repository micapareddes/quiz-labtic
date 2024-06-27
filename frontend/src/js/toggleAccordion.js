const accordion = document.getElementById('accordion-disciplinas')

function toggleAccordionDisciplinas() {
    const listaDisciplinas = document.getElementById('ul-disciplinas')
    const seta = document.getElementById('seta-disciplinas-button')
    if (listaDisciplinas.classList.contains('lg:flex')) {
        listaDisciplinas.classList.remove('lg:flex')
        seta.classList.add('rotate-0', 'group-hover:-rotate-90')
        seta.classList.remove('-rotate-90', 'group-hover:rotate-0')

    } else if (listaDisciplinas.classList.contains('flex')) {
        listaDisciplinas.classList.remove('flex')
        listaDisciplinas.classList.add('hidden')
        seta.classList.add('rotate-0', 'group-hover:-rotate-90')
        seta.classList.remove('-rotate-90', 'group-hover:rotate-0')
    } else {
        listaDisciplinas.classList.remove('hidden')
        listaDisciplinas.classList.add('flex')
        seta.classList.remove('rotate-0', 'group-hover:-rotate-90')
        seta.classList.add('-rotate-90', 'group-hover:rotate-0')
    }
}

accordion.addEventListener('click', () => {
    toggleAccordionDisciplinas()
})