export const USER_ERROR = {
    ALREADY_EXIST: {
        statusCode: 409,
        errorCode: 1409,
        message: "Usuário já existe!"
    },
    DOESENT_EXIST: {
        statusCode: 404,
        errorCode: 1404,
        message: "Usuário não existe!"
    },
    FORBIDDEN_EDIT_MATRICULA: {
        statusCode: 403,
        errorCode: 1403,
        message: "Não é permitido editar uma matrícula!"
    },
    INVALID_ID: {
        statusCode: 400,
        errorCode: 1400,
        message: "ID inválido!"
    },
    
}

export const DISCIPLINA_ERROR = {
    ALREADY_EXIST: {
        statusCode: 409,
        errorCode: 2409,
        message: "Já existe uma disciplina com esse nome!"
    },
    DOESENT_EXIST: {
        statusCode: 404,
        message: "Disciplina não existe!"        
    },
    NAME_CONFLICT: {
        statusCode: 400,
        errorCode: 2400,
        message: "O nome informado é diferente do que consta no banco!"
    }
}

export const RELATION_ERROR = {
    ALREADY_EXIST: {
        statusCode: 400,
        errorCode: 3400,
        message: 'A relação entre o aluno e a disciplina já existe!',
    },
};