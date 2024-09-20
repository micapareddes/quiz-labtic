export const USER_ERROR = {
    ALREADY_EXIST: {
        statusCode: 409,
        errorCode: 1409,
        message: "Usuário já existe!"
    },
    DOESNT_EXIST: {
        statusCode: 404,
        errorCode: 1404,
        message: "Usuário não existe!"
    },
    FORBIDDEN_EDIT: {
        statusCode: 403,
        errorCode: 1403,
        message: "Ação não permitida!"
    },
    INVALID_ID: {
        statusCode: 400,
        errorCode: 1400,
        message: "ID inválido!"
    }, 
    MISSING_REQUIRED_FIELDS: {
        statusCode: 400,
        errorCode: 1405,
        message: "Todos os campos obrigatórios devem ser fornecidos!"
    },
    INCORRECT_CURRENT_PASSWORD: { 
        statusCode: 403,
        errorCode: 1406,
        message: "Senha atual inserida errada!"
    },
    INVALID_LOGIN: {
        statusCode: 401,
        errorCode: 1401,
        message: "Credenciais inválidas"
    }
}

export const DISCIPLINA_ERROR = {
    ALREADY_EXIST: {
        statusCode: 409,
        errorCode: 2409,
        message: "Já existe uma disciplina com esse nome!"
    },
    DOESNT_EXIST: { 
        statusCode: 404,
        errorCode: 2404,
        message: "Disciplina não existe!"        
    },
    NAME_CONFLICT: {
        statusCode: 400,
        errorCode: 2400,
        message: "O nome informado é diferente do que consta no banco!"
    }, 
    ID_REQUIRED: {
        statusCode: 400,
        errorCode: 2401,
        message: "É necessário o ID da disciplina!"
    },
    MISSING_FIELDS: {
        statusCode: 400,
        errorCode: 2402,
        message: "É necessário enviar o nome ou professor ID para editar a disciplina!"
    },
    INVALID_NAME: {
        statusCode: 422,
        errorCode: 2422,
        message: "Nome inválido. O nome deve ter no mínimo 3 caracteres!"
    },
    HAS_PROFESSOR: (disciplinaName) => ({
        statusCode: 409,
        errorCode: 2410,
        message: `A disciplina ${disciplinaName} já possui um professor cadastrado!`
    }),
    INVALID_PROFESSOR: {
        statusCode: 422,
        errorCode: 2423,
        message: "O professor não está cadastrado a disciplina!"
    },
}

export const RELATION_ERROR = {
    ALREADY_EXIST: {
        statusCode: 400,
        errorCode: 3400,
        message: 'Relação já existe!',
    },
    DOESNT_EXIST: { 
        statusCode: 404,
        errorCode: 3404,
        message: "Relação entre aluno e disciplina não existe!"        
    },
}

export const TOKEN_ERROR = {
    NOT_PROVIDED: {
        statusCode: 401,
        errorCode: 4401,
        message: 'Nenhum token foi enviado!',
    },
    FORBIDDEN_ACCESS: {
        statusCode: 403,
        errorCode: 4403,
        message: 'Acesso negado!',
    }
}

export const QUIZ_ERROR = {
    NAME_ALREADY_EXIST: {
        statusCode: 409,
        errorCode: 5409,
        message: "Já existe um quiz com esse nome!"
    },
    DOESNT_EXIST: { 
        statusCode: 404,
        errorCode: 5404,
        message: "Quiz não existe!"        
    },
    FORBIDDEN_EDIT: {
        statusCode: 403,
        errorCode: 5403,
        message: "Ação não permitida!"
    },
}

export const ANSWER_ERROR = {
    NO_MORE_ATTEMPTS: {
        status: 403,
        errorCode: 6403,
        message: "O aluno não possui mais tentativas disponíveis."
    },
    DOESNT_EXIST: { 
        statusCode: 404,
        errorCode: 6404,
        message: "Resposta não existe!"        
    },
}