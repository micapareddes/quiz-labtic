import { API_ENDPOINTS } from '/frontend/src/utils/routes.js'
import { makeRequest } from '/frontend/src/functions/makeRequest.js'
import { Sidebar } from '/frontend/src/components/sidebar.js'

const disciplinas = await makeRequest({
    url: API_ENDPOINTS.GET_DISCIPLINAS_ALUNO, 
    method:'GET', 
    token: localStorage.getItem('accessToken')
})

export const painelItems = disciplinas.map((disciplina) => {
    return {
        name: disciplina.disciplina_nome,
        linkPainel: `/frontend/src/pages/aluno/disciplina/index.html?id=${disciplina.disciplina_id}`
    }
})

export function SidebarAluno(size='lg') {
    return Sidebar({
        size: size,
        items: [
            {
                icon: 'house',
                title: 'Dashboard',
                link: '/frontend/src/pages/aluno/dashboard/index.html',
                active: true,
            },
            {
                icon: 'books',
                title: 'Disciplinas',
                accordion: true,
                accordionOptions: painelItems,
            },
        ],
        changePassword: true,
    })
}