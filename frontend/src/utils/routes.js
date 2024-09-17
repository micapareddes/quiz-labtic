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
        DASHBOARD: '/frontend/src/pages/aluno/dashboard/index.html',
        QUIZ: (id) => `/frontend/src/pages/aluno/quiz/index.html?step=1&id=${id}`,
        GABARITO: ({ quiz, tentativa }) => `/frontend/src/pages/aluno/gabarito/index.html?quiz=${quiz}&tentativa=${tentativa}`,
    },
    PROFESSOR: {
        DASHBOARD: '/frontend/src/pages/professor/dashboard/index.html',
        DISCIPLINA: (id) => `/frontend/src/pages/professor/disciplina/index.html?id=${id}`,
        QUIZ: {
            INFO: (id) => `/frontend/src/pages/professor/quiz/infos/index.html?id=${id}`,
            CREATE: '/frontend/src/pages/professor/quiz/create/index.html?step=1',
            EDIT: (id) => `/frontend/src/pages/professor/quiz/create/index.html?step=1&id=${id}`,
            GABARITO: ({ quiz, tentativa }) => `/frontend/src/pages/professor/quiz/gabarito/index.html?quiz=${quiz}&tentativa=${tentativa}`,
        }
    },
}

export const API_ENDPOINTS = {
    POST_USER: 'http://localhost:3333/api/usuarios',
    POST_DISCIPLINA: 'http://localhost:3333/api/disciplinas',
    POST_QUIZ: 'http://localhost:3333/api/quiz/new',
    POST_RESPOSTA: (id) => `http://localhost:3333/api/respostas/new/${id}`,

    GET_DISCIPLINAS: 'http://localhost:3333/api/disciplinas/cadastradas',
    GET_DISCIPLINA_NAME: (id) => `http://localhost:3333/api/disciplinas/name/${id}`,
    GET_DISCIPLINA: (id) => `http://localhost:3333/api/disciplinas/${id}`,
    GET_DISCIPLINA_BY_ID: (id) => `http://localhost:3333/api/disciplinas/${id}`,
    GET_PERGUNTAS_QUIZ: (id) => `http://localhost:3333/api/respostas/quiz/${id}`,
    GET_GABARITO: (id) => `http://localhost:3333/api/respostas/gabarito/${id}`,
    EMBARALHA: (id) => `http://localhost:3333/api/quiz/embaralha/${id}`,
    GET_QUIZ: (id) => `http://localhost:3333/api/quiz/quiz/${id}`,
    GET_QUIZ_FOR_GABARITO_BY_ID: (id) => `http://localhost:3333/api/quiz/questions_gabarito/${id}`,
    GET_QUIZ_INFO_FOR_STRUDENT_BY_ID: (id) => `http://localhost:3333/api/quiz/student_infos/${id}`,
    GET_QUIZ_INFO_FOR_PROFESSOR_BY_ID: (id) => `http://localhost:3333/api/quiz/professor_infos/${id}`,
    GET_QUIZ_INFO_BY_DISCIPLINA_ID: (id) => `http://localhost:3333/api/disciplinas/quiz/${id}`,
    GET_QUIZZES_FOR_PROFESSOR_BY_DISCIPLINA_ID: (id) => `http://localhost:3333/api/quiz/prof/disciplina/${id}`,

    PATCH_ADICIONAR_QUIZ_A_DISCIPLINA: 'http://localhost:3333/api/disciplinas/quiz',
    PATCH_DISCIPLINA_BY_ID: (id) => `http://localhost:3333/api/disciplinas/editar/${id}`,
    PATCH_DISCIPLINA_POFESSOR_BY_ID: (id) => `http://localhost:3333/api/disciplinas/professor/${id}`,
    PATCH_PROFESSORES_TO_DISCIPLINAS: 'http://localhost:3333/api/disciplinas',

    GET_USER: (id) => `http://localhost:3333/api/usuarios/user_data/${id}`,
    GET_USER_TYPE: 'http://localhost:3333/api/usuarios/me',
    GET_USER_NAME: 'http://localhost:3333/api/usuarios/name',
    GET_ALL_PROFESSORES_WITH_DISCIPLINAS: 'http://localhost:3333/api/usuarios/all_professores',
    GET_DISCIPLINAS_PROFESSOR: 'http://localhost:3333/api/disciplinas/professor',
    GET_DISCIPLINAS_ALUNO: 'http://localhost:3333/api/alunos_disciplinas/get',
    PATCH_USER: (id) => `http://localhost:3333/api/usuarios/user/${id}`,
    GET_PROFESSORES: 'http://localhost:3333/api/usuarios/professores',
    GET_PROFESSOR_WITH_DISCIPLINA: (id) => `http://localhost:3333/api/usuarios/professor_disciplina/${id}`,

    GET_ALL_STUDENTS_WITH_DISCIPLINAS: 'http://localhost:3333/api/alunos_disciplinas/all_students',
    GET_STUDENT_WITH_DISCIPLINA: (id) => `http://localhost:3333/api/alunos_disciplinas/student/${id}`,
    PATCH_STUDENT_DISCIPLINAS: (id) => `http://localhost:3333/api/alunos_disciplinas/student/${id}`,
    POST_STUDENT_RELATIONS: 'http://localhost:3333/api/alunos_disciplinas',

    DELETE_QUIZ: (id) => `http://localhost:3333/api/quiz/quiz/${id}`,
    DELETE_USER: 'http://localhost:3333/api/usuarios',
    DELETE_DISCIPLINA: 'http://localhost:3333/api/disciplinas',
    DELETE_PROFESSOR_FROM_DISCIPLINA: 'http://localhost:3333/api/disciplinas/professor',
    DELETE_RELATION_BY_DISCIPLINA_ID: 'http://localhost:3333/api/alunos_disciplinas/disciplina',    
    DELETE_RELATION_BY_ALUNO_ID: 'http://localhost:3333/api/alunos_disciplinas/aluno',
}