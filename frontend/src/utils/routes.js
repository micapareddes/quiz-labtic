export const ROUTES = {
    LOGIN: '/frontend/src/pages/login/index.html',
    ERROR404: '/frontend/src/old-pages/404.html',
    ADMIN: {
        DASHBOARD: '/frontend/src/pages/admin/dashboard/index.html',
        PAINEL: {
            DISCIPLINAS: '/frontend/src/pages/admin/painel/disciplinas/index.html',
            ALUNOS: '/frontend/src/pages/admin/painel/alunos/index.html',
            PROFESSORES: '/frontend/src/pages/admin/painel/professores/index.html',
        },
        CADASTRO: {
            DISCIPLINAS: '/frontend/src/pages/admin/cadastro/disciplinas/index.html',
            ALUNOS: '/frontend/src/pages/admin/cadastro/alunos/index.html',
            PROFESSORES: '/frontend/src/pages/admin/cadastro/professores/index.html',
        },
        EDICAO: {
            DISCIPLINAS: (id) => `/frontend/src/pages/admin/edicao/disciplinas/index.html?id=${id}`,
            ALUNOS: (id) => `/frontend/src/pages/admin/edicao/alunos/index.html?id=${id}`,
            PROFESSORES: (id) => `/frontend/src/pages/admin/edicao/professores/index.html?id=${id}`,
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
    POST_USER: 'http://localhost:3333/api/usuarios',
    POST_DISCIPLINA: 'http://localhost:3333/api/disciplinas',

    GET_DISCIPLINAS: 'http://localhost:3333/api/disciplinas/cadastradas',
    GET_DISCIPLINA: (id) => `http://localhost:3333/api/disciplinas/${id}`,
    GET_DISCIPLINA_BY_ID: (id) => `http://localhost:3333/api/disciplinas/${id}`,
    PATCH_DISCIPLINA_BY_ID: (id) => `http://localhost:3333/api/disciplinas/${id}`,
    PATCH_DISCIPLINA_POFESSOR_BY_ID: (id) => `http://localhost:3333/api/disciplinas/professor/${id}`,
    PATCH_PROFESSORES_TO_DISCIPLINAS: 'http://localhost:3333/api/disciplinas',

    GET_USER: (id) => `http://localhost:3333/api/usuarios/user_data/${id}`,
    GET_USER_TYPE: 'http://localhost:3333/api/usuarios/me',
    GET_USER_NAME: 'http://localhost:3333/api/usuarios/name',
    GET_ALL_PROFESSORES_WITH_DISCIPLINAS: 'http://localhost:3333/api/usuarios/all_professores',
    PATCH_USER: (id) => `http://localhost:3333/api/usuarios/user/${id}`,

    GET_PROFESSORES: 'http://localhost:3333/api/usuarios/professores',
    GET_PROFESSOR_WITH_DISCIPLINA: (id) => `http://localhost:3333/api/usuarios/professor_disciplina/${id}`,

    GET_ALL_STUDENTS_WITH_DISCIPLINAS: 'http://localhost:3333/api/alunos_disciplinas/all_students',
    GET_STUDENT_WITH_DISCIPLINA: (id) => `http://localhost:3333/api/alunos_disciplinas/student/${id}`,
    PATCH_STUDENT_DISCIPLINAS: (id) => `http://localhost:3333/api/alunos_disciplinas/student/${id}`,
    POST_STUDENT_RELATIONS: 'http://localhost:3333/api/alunos_disciplinas',

    DELETE_USER: 'http://localhost:3333/api/usuarios',
    DELETE_DISCIPLINA: 'http://localhost:3333/api/disciplinas',
    DELETE_PROFESSOR_FROM_DISCIPLINA: 'http://localhost:3333/api/disciplinas/professor',
    DELETE_RELATION_BY_DISCIPLINA_ID: 'http://localhost:3333/api/alunos_disciplinas/disciplina',    
    DELETE_RELATION_BY_ALUNO_ID: 'http://localhost:3333/api/alunos_disciplinas/aluno',
}