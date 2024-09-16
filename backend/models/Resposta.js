import { Schema, model, mongoose } from "mongoose";
import { ModeloUsuario } from "./Usuario.js";
import { schemaPerguntas } from "./Quiz.js";

const schemaGabarito = new Schema({
    pergunta_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz.perguntas',
        required: false,     
    },
    alternativa_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz.perguntas.alternativas',
        required: false,    
    },
    acertou: {
        type: Boolean,
        required: false,
    }
})
const schemaResposta = new Schema({
    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true, 
    },    
    aluno_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true, 
        validate: {
            validator: async function(value) {
                const usuario = await ModeloUsuario.findById(value);
                return usuario && usuario.papel === 'aluno';
            },
            message: 'O aluno_id deve referenciar um usuário com papel igual a "aluno".'
        }
    },
    perguntas_quiz: [schemaPerguntas],
    tempo_quiz: {
        type: Number,
        required: true,
    },
    nome_quiz: {
        type: String,
        required: true,
    },
    disciplina_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplina',
        required: true,
    },
    nota: {
        type: Number,
        required: false,
    },
    gabarito: [schemaGabarito],
}, { timestamps: true })

export const ModeloResposta = model('Resposta', schemaResposta)