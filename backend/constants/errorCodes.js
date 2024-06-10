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
    FORBIDDEN_EDIT: {
        statusCode: 403,
        errorCode: 1403,
        message: "Não é permitido editar a matrícula e/ou senha!"
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
    ICONRRECT_CURRENT_PASSWORD: {
        statusCode: 403,
        errorCode: 1406,
        message: "Senha atual inserida errada!"
    },
    INVALID_LOGIN: {
        statusCode: 401,
        errorCode: 1401,
        message: "Senha ou usuario inválidos!"
    }
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