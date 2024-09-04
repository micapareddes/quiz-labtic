import { ROUTES, API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { Sidebar } from '/frontend/src/components/sidebar.js'

const disciplinas = await makeRequest({
    url: API_ENDPOINTS.GET_DISCIPLINAS_ALUNO, 
    method:'GET', 
    token: localStorage.getItem('accessToken')
})
console.log(disciplinas);

export const painelItems = disciplinas.map((disciplina) => {
    return {
        name: disciplina.disciplina_nome,
        linkPainel: `/${disciplina.disciplina_id}`
    }
})
console.log(painelItems);

export function SidebarAluno(size='lg') {
    return Sidebar({
        size: size,
        items: [
            {
                icon: 'house',
                title: 'Dashboard',
                link: '/',
                active: true,
            },
            {
                icon: 'books',
                title: 'Disciplinas',
                link: '/',
                accordion: true,
                accordionOptions: painelItems,
            },
        ],
        changePassword: true,
    })
}