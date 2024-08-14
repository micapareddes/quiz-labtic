export const ROUTES = {
    LOGIN: '/frontend/src/pages/login/login.html',
    ERROR404: '/frontend/src/old-pages/404.html',
    ADMIN: {
        DASHBOARD: '/frontend/src/pages/admin/dashboard/index.html',
        PAINEL: {
            DISCIPLINAS: '/frontend/src/pages/admin/painel/disciplinas/index.html',
            ALUNOS: '/frontend/src/pages/admin/painel/alunos/index.html',
        },
        CADASTRO: {
            DISCIPLINAS: '/frontend/src/pages/admin/cadastro/disciplinas/index.html'
        },
        EDICAO: {
            DISCIPLINAS: (id) => `/frontend/src/pages/admin/edicao/disciplinas/index.html?id=${id}`,
        },
    },
    ALUNO: {
        DASHBOARD: '/frontend/src/old-pages/aluno/dashboard.html',
    },
    PROFESSOR: {
        DASHBOARD: 'http://localhost:5500/frontend/src/pages/professor/dashboard.html',
    },
}

export const API_ENDPOINTS = {
    GET_DISCIPLINAS: 'http://localhost:3333/api/disciplinas/cadastradas',
    GET_DISCIPLINA_BY_ID: (id) => `http://localhost:3333/api/disciplinas/${id}`,
    POST_DISCIPLINA: 'http://localhost:3333/api/disciplinas',
    PATCH_DISCIPLINA_BY_ID: (id) => `http://localhost:3333/api/disciplinas/${id}`,
    DELETE_DISCIPLINA: 'http://localhost:3333/api/disciplinas',

    GET_USER_TYPE: 'http://localhost:3333/api/usuarios/me',
    GET_USER_NAME: 'http://localhost:3333/api/usuarios/name',

    GET_PROFESSORES: 'http://localhost:3333/api/usuarios/professores',

    GET_ALL_STUDENTS_WITH_DISCIPLINAS: 'http://localhost:3333/api/alunos_disciplinas/all_students',
    GET_ALL_PROFESSORS_WITH_DISCIPLINAS: '', //TODO:
    DELETE_RELATION: 'http://localhost:3333/api/alunos_disciplinas',
}