import { Schema, model, mongoose } from 'mongoose'
import validator from 'validator'

function validarTempo(value) {
    return (value >= 30 && value <= 240 && value % 30 === 0);
}
function validarDatas() {
    const currentDate = new Date().toISOString().split('T')[0]
    const startDate = this.data_inicio
    const endDate = this.data_fim
    const isStartDateValid = startDate >= currentDate
    const isEndDateValid = endDate >= startDate
    
    if (isStartDateValid && isEndDateValid) return true;
    else return false;
}

const schemaAlternativas = new Schema({
    conteudo: {
        type: String,
        required: false,
    },     
    isCorreta: {
        type: Boolean,
        required: false,
    }, 
})
export const schemaPerguntas = new Schema({
    pergunta: {
        type: String,
        required: false,
    },
    alternativas: [schemaAlternativas]
})
const schemaQuiz = new Schema({
    disciplina_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplina',
        required: true,  
    },
    titulo: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'O nome do quiz deve ter pelo menos 3 caracteres.']
    },
    tempo: {
        type: Number,
        required: true,
        validate: {
            validator: validarTempo,
            message: 'O valor de tempo deve ser um número entre 30 e 240 e múltiplo de 30.',
        }
    },
    tentativas: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
        enum: {
            values: ['prova', 'simulado', 'quiz'],
            message: 'O tipo deve ser prova, simulado ou quiz!'
        }
    }, 
    data_inicio: {
        type: String,
        required: true,
    },    
    data_fim: {
        type: String,
        required: true,
    },    
    orientacao: {
        type: String,
        required: false,
    },       
    isRascunho: {
        type: Boolean,
        required: true,
    },    
    perguntas: [schemaPerguntas]
} , { timestamps: true })

schemaQuiz.pre('validate', function (next) {
    if (!validarDatas.call(this)) {
        this.invalidate('data_inicio', 'Data de fim deve ser maior que a data de inicio e ambas devem ser maiores ou iguais à data atual.');
        return next(new Error('Validação de datas falhou'));
    }
    next();
});

export const ModeloQuiz = model('Quiz', schemaQuiz)