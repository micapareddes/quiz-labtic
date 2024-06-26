// UI ------------------------------
function criarUlDisciplinasSidebar() {
    const htmlLiDisciplinas = document.getElementById('disciplinas-li')

    const ul = createHTMLElement('ul')
    ul.id = 'ul-disciplinas'
    ul.className = 'flex-col items-start justify-center absolute lg:relative top-10 md:top-32 lg:top-0 right-0 md:left-24 lg:left-0 w-52 lg:w-full mt-5 lg:mt-0 px-6 pt-4 lg:pt-6 bg-neutral-50 lg:bg-transparent border border-neutral-200 lg:border-none rounded-2xl shadow-md lg:shadow-none hidden'

    htmlLiDisciplinas.appendChild(ul)
}

function criarLiDisciplinasSidebar(nomeDisciplina) {
    const ul = document.getElementById('ul-disciplinas')

    const li = createHTMLElement('li')
    const a = createHTMLElement('a')
    a.className = 'block cursor-pointer mb-4 text-stone-900 lg:text-indigo-50 text-sm hover:text-yellow-500 lg:hover:text-yellow-200'
    a.textContent = nomeDisciplina

    li.appendChild(a)
    ul.appendChild(li)
}

// Accordion Disciplinas ---------------------------------
function inabilitarAccordionDisciplinas() {
    const accordion = document.getElementById('accordion-disciplinas')
    const seta = document.getElementById('seta-disciplinas-button')
    const titulo = document.getElementById('p-disciplinas-button')

    seta.classList.remove('group-hover:rotate-0')
    accordion.disabled = true
    accordion.classList.remove('hover:border-l-yellow-200')
    accordion.classList.add('opacity-50')
    titulo.classList.remove('group-hover:font-semibold')
}